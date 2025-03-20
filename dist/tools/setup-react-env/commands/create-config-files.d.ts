/**
 * Create Configuration Files Command
 * Handles creation of project configuration files
 */
import { CommandResult } from '../../../types';
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
declare const createConfigFiles: (options?: ConfigFileOptions) => Promise<CommandResult>;
export default createConfigFiles;
