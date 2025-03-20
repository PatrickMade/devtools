"use strict";
/**
 * Install Dependencies Command
 * Handles installation of project dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const package_manager_1 = require("../utils/package-manager");
/**
 * Installs required dependencies
 * @param options - Installation options
 * @returns Result of the installation
 */
const installDependencies = async (options = {}) => {
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
    const { detectedPackageManager, useCorepack, packageManagerDef } = (0, package_manager_1.detectPackageManager)({
        packageManager,
        outputDir,
    });
    // Build the install command
    const command = (0, package_manager_1.buildInstallCommand)({
        dependencies,
        packageManager: detectedPackageManager,
        useCorepack,
        packageManagerDef,
        outputDir,
    });
    console.log(chalk_1.default.gray(command));
    if (dryRun) {
        return { success: true, dryRun: true };
    }
    try {
        (0, child_process_1.execSync)(command, { stdio: 'inherit' });
        return { success: true };
    }
    catch (error) {
        // If the command failed and we're using Corepack, provide a helpful message
        if (useCorepack) {
            console.log(chalk_1.default.yellow('\nThe command failed. This might be because Corepack is not enabled.'));
            console.log(chalk_1.default.yellow('You can enable Corepack by running:'));
            console.log(chalk_1.default.gray('  corepack enable'));
            console.log(chalk_1.default.yellow('\nOr you can run the tool with --dryRun to only generate configuration files:'));
            console.log(chalk_1.default.gray('  pmdt setup-react-env --dryRun'));
            return {
                success: false,
                error: error,
                corepackRequired: true,
            };
        }
        console.error(chalk_1.default.red('Error installing dependencies:'), error);
        return { success: false, error: error };
    }
};
exports.default = installDependencies;
