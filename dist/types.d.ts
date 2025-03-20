/**
 * Common Types for the project
 */
/**
 * Command execution result
 */
export interface CommandResult {
    success: boolean;
    error?: Error;
    [key: string]: any;
}
/**
 * Tool definition structure
 */
export interface ToolDefinition {
    id: string;
    name: string;
    description: string;
    execute: (options: any) => Promise<CommandResult>;
    options?: {
        [key: string]: {
            description: string;
            default?: any;
            choices?: string[];
            type?: string;
        };
    };
}
/**
 * AI Prompt definition
 */
export interface Prompt {
    id: string;
    name: string;
    category: string;
    description: string;
    prompt: string;
}
/**
 * Clipboard operation result
 */
export interface ClipboardResult {
    success: boolean;
    message: string;
    error?: Error;
}
/**
 * Package manager detection result
 */
export interface PackageManagerInfo {
    detectedPackageManager: string;
    useCorepack: boolean;
    packageManagerDef: string | null;
    hasYarnLock: boolean;
    hasNpmLock: boolean;
}
/**
 * Options for building a package manager command
 */
export interface BuildCommandOptions {
    dependencies: string[];
    packageManager: string;
    useCorepack: boolean;
    packageManagerDef: string | null;
    outputDir: string;
}
