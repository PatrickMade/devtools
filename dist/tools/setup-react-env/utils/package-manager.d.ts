/**
 * Package Manager Utilities
 * Functions for detecting and working with package managers
 */
import { BuildCommandOptions, PackageManagerInfo } from '../../../types';
/**
 * Options for detecting package manager
 */
interface DetectOptions {
    packageManager?: string;
    outputDir?: string;
}
/**
 * Detects which package manager to use based on lock files
 * @param options - Options containing the output directory and default package manager
 * @returns Information about which package manager to use
 */
export declare const detectPackageManager: (options?: DetectOptions) => PackageManagerInfo;
/**
 * Builds the appropriate install command based on package manager
 * @param options - Options for building the command
 * @returns The command to execute
 */
export declare const buildInstallCommand: (options: BuildCommandOptions) => string;
export {};
