/**
 * Create Configuration Files Command
 * Handles creation of project configuration files
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { CommandResult } from '../../../types';
import { eslintConfig, prettierConfig, tsConfig, vscodeSettings } from '../config';

/**
 * Options for creating config files
 */
interface ConfigFileOptions {
  outputDir?: string;
}

/**
 * Creates the project configuration files
 * @param options - Configuration options
 * @returns Result of the operation
 */
const createConfigFiles = async (options: ConfigFileOptions = {}): Promise<CommandResult> => {
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
    return { success: false, error: error as Error };
  }
};

export default createConfigFiles;
