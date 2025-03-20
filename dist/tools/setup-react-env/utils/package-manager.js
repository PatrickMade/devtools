"use strict";
/**
 * Package Manager Utilities
 * Functions for detecting and working with package managers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInstallCommand = exports.detectPackageManager = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
/**
 * Detects which package manager to use based on lock files
 * @param options - Options containing the output directory and default package manager
 * @returns Information about which package manager to use
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
        hasYarnLock = fs_1.default.existsSync(path_1.default.join(outputDir, 'yarn.lock'));
        hasNpmLock = fs_1.default.existsSync(path_1.default.join(outputDir, 'package-lock.json'));
        if (hasYarnLock && !hasNpmLock) {
            detectedPackageManager = 'yarn';
            console.log(chalk_1.default.blue('Detected yarn.lock file, using yarn as package manager'));
        }
        else if (hasNpmLock && !hasYarnLock) {
            detectedPackageManager = 'npm';
            console.log(chalk_1.default.blue('Detected package-lock.json file, using npm as package manager'));
        }
        else if (hasYarnLock && hasNpmLock) {
            console.log(chalk_1.default.yellow('Both yarn.lock and package-lock.json files detected. Using specified package manager.'));
        }
    }
    catch (error) {
        console.log(chalk_1.default.yellow('Error checking for lock files, continuing with default package manager.'));
    }
    // Only check parent directories for packageManager if no lock files are found
    const checkParentForPackageManager = !hasYarnLock && !hasNpmLock;
    try {
        // First, look for package.json in the target directory
        const packageJsonPath = path_1.default.join(outputDir, 'package.json');
        if (fs_1.default.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
            if (packageJson.packageManager) {
                useCorepack = true;
                packageManagerDef = packageJson.packageManager;
                console.log(chalk_1.default.blue(`Found packageManager: ${packageManagerDef} in ${packageJsonPath}`));
            }
        }
        // If no packageManager field was found and we need to check parent directories
        else if (checkParentForPackageManager) {
            // Check if a parent directory has a package.json with packageManager field
            // This helps find the source of unexpected packageManager errors
            let currentDir = outputDir;
            const homeDir = os_1.default.homedir();
            while (currentDir !== path_1.default.parse(currentDir).root && currentDir !== homeDir) {
                currentDir = path_1.default.dirname(currentDir);
                const parentPackageJsonPath = path_1.default.join(currentDir, 'package.json');
                if (fs_1.default.existsSync(parentPackageJsonPath)) {
                    try {
                        const parentPackageJson = JSON.parse(fs_1.default.readFileSync(parentPackageJsonPath, 'utf8'));
                        if (parentPackageJson.packageManager) {
                            console.log(chalk_1.default.yellow(`Warning: Found packageManager field in parent directory: ${currentDir}`));
                            console.log(chalk_1.default.yellow(`This may cause conflicts. Consider using --dryRun option.`));
                            // Don't set useCorepack here, as we want to use the local package manager
                            break;
                        }
                    }
                    catch (e) {
                        // Ignore errors parsing parent package.json
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(chalk_1.default.yellow('Could not read package.json, continuing with detected package manager.'));
    }
    return {
        detectedPackageManager,
        useCorepack,
        packageManagerDef,
        hasYarnLock,
        hasNpmLock,
    };
};
exports.detectPackageManager = detectPackageManager;
/**
 * Builds the appropriate install command based on package manager
 * @param options - Options for building the command
 * @returns The command to execute
 */
const buildInstallCommand = (options) => {
    const { dependencies = [], packageManager = 'yarn', useCorepack = false, packageManagerDef = null, outputDir = process.cwd(), } = options;
    let command = '';
    if (useCorepack && packageManagerDef) {
        // When packageManager is defined, use npx to run the command - this automatically respects the packageManager field
        const corepackManager = packageManagerDef.split('@')[0];
        const corepackVersion = packageManagerDef.split('@')[1];
        console.log(chalk_1.default.blue(`Project uses ${corepackManager}@${corepackVersion} defined in package.json`));
        // Use npx to run the package manager command - this handles Corepack automatically
        command = `npx ${corepackManager}`;
        // Add appropriate flags based on the package manager and directory
        if (corepackManager === 'npm') {
            command += ` ${outputDir !== process.cwd() ? `--prefix "${outputDir}"` : ''} install --save-dev ${dependencies.join(' ')}`;
        }
        else {
            command += ` ${outputDir !== process.cwd() ? `--cwd "${outputDir}"` : ''} add --dev ${dependencies.join(' ')}`;
        }
        console.log(chalk_1.default.blue(`Installing dependencies with ${corepackManager} (via npx)...`));
    }
    else {
        // Standard approach for projects without packageManager field
        command =
            packageManager === 'npm'
                ? `npm ${outputDir !== process.cwd() ? `--prefix "${outputDir}"` : ''} install --save-dev ${dependencies.join(' ')}`
                : `yarn ${outputDir !== process.cwd() ? `--cwd "${outputDir}"` : ''} add --dev ${dependencies.join(' ')}`;
        console.log(chalk_1.default.blue(`Installing dependencies with ${packageManager}...`));
    }
    return command;
};
exports.buildInstallCommand = buildInstallCommand;
