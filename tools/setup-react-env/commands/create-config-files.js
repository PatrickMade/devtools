/**
 * Create Configuration Files Command
 * Handles creation of project configuration files
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { prettierConfig, eslintConfig, vscodeSettings, tsConfig } = require('../config');

/**
 * Creates the project configuration files
 * @param {Object} options - Configuration options
 * @returns {Promise<Object>} Result of the operation
 */
const createConfigFiles = async (options = {}) => {
  const { outputDir = process.cwd() } = options;

  try {
    // Create .vscode directory if it doesn't exist
    const vscodeDir = path.join(outputDir, '.vscode');
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    // Write files
    fs.writeFileSync(path.join(outputDir, '.prettierrc'), JSON.stringify(prettierConfig, null, 2));
    fs.writeFileSync(path.join(outputDir, '.eslintrc.js'), eslintConfig);
    fs.writeFileSync(
      path.join(vscodeDir, 'settings.json'),
      JSON.stringify(vscodeSettings, null, 2)
    );
    fs.writeFileSync(path.join(outputDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

    return { success: true };
  } catch (error) {
    console.error(chalk.red('Error creating configuration files:'), error);
    return { success: false, error };
  }
};

module.exports = createConfigFiles;
