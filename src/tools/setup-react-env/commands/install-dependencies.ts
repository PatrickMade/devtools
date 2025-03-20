/**
 * Install Dependencies Command
 * Handles installation of project dependencies
 */

import chalk from 'chalk';
import { execSync } from 'child_process';
import { CommandResult } from '../../../types';
import { buildInstallCommand, detectPackageManager } from '../utils/package-manager';

/**
 * Options for installing dependencies
 */
interface InstallOptions {
  packageManager?: string;
  dryRun?: boolean;
  outputDir?: string;
}

/**
 * Installs required dependencies
 * @param options - Installation options
 * @returns Result of the installation
 */
const installDependencies = async (options: InstallOptions = {}): Promise<CommandResult> => {
  const { packageManager = 'yarn', dryRun = false, outputDir = process.cwd() } = options;

  const dependencies = [
    'eslint',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'prettier',
    'eslint-config-prettier',
  ];

  // Detect package manager and corepack usage
  const { detectedPackageManager, useCorepack, packageManagerDef } = detectPackageManager({
    packageManager,
    outputDir,
  });

  // Build the install command
  const command = buildInstallCommand({
    dependencies,
    packageManager: detectedPackageManager,
    useCorepack,
    packageManagerDef,
    outputDir,
  });

  console.log(chalk.gray(command));

  if (dryRun) {
    return { success: true, dryRun: true };
  }

  try {
    execSync(command, { stdio: 'inherit' });
    return { success: true };
  } catch (error) {
    // If the command failed and we're using Corepack, provide a helpful message
    if (useCorepack) {
      console.log(
        chalk.yellow('\nThe command failed. This might be because Corepack is not enabled.')
      );
      console.log(chalk.yellow('You can enable Corepack by running:'));
      console.log(chalk.gray('  corepack enable'));
      console.log(
        chalk.yellow(
          '\nOr you can run the tool with --dryRun to only generate configuration files:'
        )
      );
      console.log(chalk.gray('  pmdt setup-react-env --dryRun'));

      return {
        success: false,
        error: error as Error,
        corepackRequired: true,
      };
    }

    console.error(chalk.red('Error installing dependencies:'), error);
    return { success: false, error: error as Error };
  }
};

export default installDependencies;
