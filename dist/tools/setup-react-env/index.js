"use strict";
/**
 * React Development Environment Setup Tool
 * This tool sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const create_config_files_1 = __importDefault(require("./commands/create-config-files"));
const install_dependencies_1 = __importDefault(require("./commands/install-dependencies"));
/**
 * Execute the setup React environment tool
 * @param options - Tool options
 * @returns Tool execution result
 */
const execute = async (options = {}) => {
    console.log(chalk_1.default.blue.bold('Setting up React/React Native development environment with TypeScript...'));
    try {
        // Step 1: Install dependencies
        const installResult = await (0, install_dependencies_1.default)(options);
        if (!installResult.success && !installResult.dryRun) {
            if (installResult.corepackRequired) {
                console.log(chalk_1.default.yellow('\nSkipping dependency installation due to Corepack requirement.'));
                console.log(chalk_1.default.yellow('Continuing with configuration file creation...\n'));
            }
            else {
                return { success: false, stage: 'dependencies', error: installResult.error };
            }
        }
        // Step 2: Create configuration files
        const configResult = await (0, create_config_files_1.default)(options);
        if (!configResult.success) {
            return { success: false, stage: 'configuration', error: configResult.error };
        }
        // Success output
        console.log(chalk_1.default.green.bold('✔ Setup complete!'));
        console.log(chalk_1.default.blue('The following files were created:'));
        console.log(chalk_1.default.green('- .prettierrc'));
        console.log(chalk_1.default.green('- .eslintrc.js'));
        console.log(chalk_1.default.green('- .vscode/settings.json'));
        console.log(chalk_1.default.green('- tsconfig.json'));
        if (installResult.corepackRequired) {
            console.log(chalk_1.default.yellow('\nNote: Dependencies were not installed due to Corepack requirement.'));
            console.log(chalk_1.default.yellow('After enabling Corepack with "corepack enable", install the dependencies manually:'));
            console.log(chalk_1.default.gray('yarn add --dev eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier'));
        }
        console.log(chalk_1.default.blue('\nMake sure to install the recommended VSCode extensions for the best development experience.'));
        return {
            success: installResult.success || installResult.corepackRequired,
            corepackRequired: installResult.corepackRequired,
        };
    }
    catch (error) {
        console.error(chalk_1.default.red('Error during setup:'), error);
        return { success: false, error: error };
    }
};
// Export the tool definition
const setupReactEnvTool = {
    id: 'setup-react-env',
    name: 'React Development Environment Setup',
    description: 'Sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier',
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
exports.default = setupReactEnvTool;
