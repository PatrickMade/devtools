/**
 * Package Manager Utilities
 * Functions for detecting and working with package managers
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const os = require('os');

/**
 * Detects which package manager to use based on lock files
 * @param {Object} options - Options containing the output directory and default package manager
 * @returns {Object} Information about which package manager to use
 */
const detectPackageManager = (options = {}) => {
  const { packageManager = 'yarn', outputDir = process.cwd() } = options;

  let detectedPackageManager = packageManager;
  let hasYarnLock = false;
  let hasNpmLock = false;
  let useCorepack = false;
  let packageManagerDef = null;

  try {
    // Check for lock files in the target directory
    hasYarnLock = fs.existsSync(path.join(outputDir, 'yarn.lock'));
    hasNpmLock = fs.existsSync(path.join(outputDir, 'package-lock.json'));

    if (hasYarnLock && !hasNpmLock) {
      detectedPackageManager = 'yarn';
      console.log(chalk.blue('Detected yarn.lock file, using yarn as package manager'));
    } else if (hasNpmLock && !hasYarnLock) {
      detectedPackageManager = 'npm';
      console.log(chalk.blue('Detected package-lock.json file, using npm as package manager'));
    } else if (hasYarnLock && hasNpmLock) {
      console.log(chalk.yellow('Both yarn.lock and package-lock.json files detected. Using specified package manager.'));
    }
  } catch (error) {
    console.log(chalk.yellow('Error checking for lock files, continuing with default package manager.'));
  }

  // Only check parent directories for packageManager if no lock files are found
  let checkParentForPackageManager = !hasYarnLock && !hasNpmLock;

  try {
    // First, look for package.json in the target directory
    const packageJsonPath = path.join(outputDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.packageManager) {
        useCorepack = true;
        packageManagerDef = packageJson.packageManager;
        console.log(chalk.blue(`Found packageManager: ${packageManagerDef} in ${packageJsonPath}`));
      }
    }
    // If no packageManager field was found and we need to check parent directories
    else if (checkParentForPackageManager) {
      // Check if a parent directory has a package.json with packageManager field
      // This helps find the source of unexpected packageManager errors
      let currentDir = outputDir;
      const homeDir = os.homedir();

      while (currentDir !== path.parse(currentDir).root && currentDir !== homeDir) {
        currentDir = path.dirname(currentDir);
        const parentPackageJsonPath = path.join(currentDir, 'package.json');

        if (fs.existsSync(parentPackageJsonPath)) {
          try {
            const parentPackageJson = JSON.parse(fs.readFileSync(parentPackageJsonPath, 'utf8'));
            if (parentPackageJson.packageManager) {
              console.log(chalk.yellow(`Warning: Found packageManager field in parent directory: ${currentDir}`));
              console.log(chalk.yellow(`This may cause conflicts. Consider using --dryRun option.`));
              // Don't set useCorepack here, as we want to use the local package manager
              break;
            }
          } catch (e) {
            // Ignore errors parsing parent package.json
          }
        }
      }
    }
  } catch (error) {
    console.log(chalk.yellow('Could not read package.json, continuing with detected package manager.'));
  }

  return {
    detectedPackageManager,
    useCorepack,
    packageManagerDef,
    hasYarnLock,
    hasNpmLock
  };
};

/**
 * Builds the appropriate install command based on package manager
 * @param {Object} options - Options for building the command
 * @returns {string} The command to execute
 */
const buildInstallCommand = (options = {}) => {
  const {
    dependencies = [],
    packageManager = 'yarn',
    useCorepack = false,
    packageManagerDef = null,
    outputDir = process.cwd()
  } = options;

  let command = '';

  if (useCorepack && packageManagerDef) {
    // When packageManager is defined, use npx to run the command - this automatically respects the packageManager field
    const corepackManager = packageManagerDef.split('@')[0];
    const corepackVersion = packageManagerDef.split('@')[1];

    console.log(chalk.blue(`Project uses ${corepackManager}@${corepackVersion} defined in package.json`));

    // Use npx to run the package manager command - this handles Corepack automatically
    command = `npx ${corepackManager}`;

    // Add appropriate flags based on the package manager and directory
    if (corepackManager === 'npm') {
      command += ` ${outputDir !== process.cwd() ? `--prefix "${outputDir}"` : ''} install --save-dev ${dependencies.join(' ')}`;
    } else {
      command += ` ${outputDir !== process.cwd() ? `--cwd "${outputDir}"` : ''} add --dev ${dependencies.join(' ')}`;
    }

    console.log(chalk.blue(`Installing dependencies with ${corepackManager} (via npx)...`));
  } else {
    // Standard approach for projects without packageManager field
    command = packageManager === 'npm'
      ? `npm ${outputDir !== process.cwd() ? `--prefix "${outputDir}"` : ''} install --save-dev ${dependencies.join(' ')}`
      : `yarn ${outputDir !== process.cwd() ? `--cwd "${outputDir}"` : ''} add --dev ${dependencies.join(' ')}`;

    console.log(chalk.blue(`Installing dependencies with ${packageManager}...`));
  }

  return command;
};

module.exports = {
  detectPackageManager,
  buildInstallCommand
};
