/**
 * React Development Environment Setup Tool
 * This tool sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier
 */

const chalk = require('chalk');

// Import commands
const installDependencies = require('./commands/install-dependencies');
const createConfigFiles = require('./commands/create-config-files');

/**
 * Execute the setup React environment tool
 * @param {Object} options - Tool options
 * @returns {Promise<Object>} Tool execution result
 */
const execute = async (options = {}) => {
  console.log(
    chalk.blue.bold('Setting up React/React Native development environment with TypeScript...')
  );

  try {
    // Step 1: Install dependencies
    const installResult = await installDependencies(options);
    if (!installResult.success && !installResult.dryRun) {
      if (installResult.corepackRequired) {
        console.log(
          chalk.yellow('\nSkipping dependency installation due to Corepack requirement.')
        );
        console.log(chalk.yellow('Continuing with configuration file creation...\n'));
      } else {
        return { success: false, stage: 'dependencies', error: installResult.error };
      }
    }

    // Step 2: Create configuration files
    const configResult = await createConfigFiles(options);
    if (!configResult.success) {
      return { success: false, stage: 'configuration', error: configResult.error };
    }

    // Success output
    console.log(chalk.green.bold('✔ Setup complete!'));
    console.log(chalk.blue('The following files were created:'));
    console.log(chalk.green('- .prettierrc'));
    console.log(chalk.green('- .eslintrc.js'));
    console.log(chalk.green('- .vscode/settings.json'));
    console.log(chalk.green('- tsconfig.json'));

    if (installResult.corepackRequired) {
      console.log(
        chalk.yellow('\nNote: Dependencies were not installed due to Corepack requirement.')
      );
      console.log(
        chalk.yellow(
          'After enabling Corepack with "corepack enable", install the dependencies manually:'
        )
      );
      console.log(
        chalk.gray(
          'yarn add --dev eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier'
        )
      );
    }

    console.log(
      chalk.blue(
        '\nMake sure to install the recommended VSCode extensions for the best development experience.'
      )
    );

    return {
      success: installResult.success || installResult.corepackRequired,
      corepackRequired: installResult.corepackRequired,
    };
  } catch (error) {
    console.error(chalk.red('Error during setup:'), error);
    return { success: false, error };
  }
};

// Export the tool definition
module.exports = {
  id: 'setup-react-env',
  name: 'React Development Environment Setup',
  description:
    'Sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier',
  execute,
  options: {
    outputDir: {
      description: 'Directory where configuration files will be created',
      default: process.cwd(),
    },
    packageManager: {
      description: 'Package manager to use for installing dependencies',
      default: 'yarn',
      choices: ['yarn', 'npm'],
    },
    dryRun: {
      description: 'Run without actually installing dependencies',
      default: false,
      type: 'boolean',
    },
  },
};
