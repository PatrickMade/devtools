#!/usr/bin/env node

/**
 * Post-build script to ensure that bin files are executable
 * This script is cross-platform and will work on Windows as well
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const chmodAsync = promisify(fs.chmod);

// Check if a platform is Windows
const isWindows = process.platform === 'win32';

/**
 * Make bin files executable
 */
async function makeBinFilesExecutable() {
  try {
    console.log('Making bin files executable...');

    // Get bin directory
    const binDir = path.join(__dirname, '..', 'dist', 'bin');

    // Read all files in the bin directory
    const files = fs.readdirSync(binDir);

    // Make each .js file executable
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(binDir, file);

        if (isWindows) {
          // On Windows, we don't need to change file permissions
          console.log(`Windows: Skipping chmod for ${file}`);
        } else {
          // On Unix-like systems, make the file executable (chmod +x)
          await chmodAsync(filePath, '755');
          console.log(`Made ${file} executable`);
        }

        // Add shebang line at the beginning of the file if not already present
        ensureShebang(filePath);
      }
    }

    console.log('Post-build completed successfully!');
  } catch (error) {
    console.error('Error during post-build:', error);
    process.exit(1);
  }
}

/**
 * Ensure the file has a shebang line
 */
function ensureShebang(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if the file already has a shebang
  if (!content.startsWith('#!/usr/bin/env node')) {
    // Add shebang line at the beginning
    const newContent = `#!/usr/bin/env node\n${content}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Added shebang to ${path.basename(filePath)}`);
  }
}

// Run the function
makeBinFilesExecutable();
