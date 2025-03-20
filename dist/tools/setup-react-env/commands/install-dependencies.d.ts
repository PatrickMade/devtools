/**
 * Install Dependencies Command
 * Handles installation of project dependencies
 */
import { CommandResult } from '../../../types';
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
declare const installDependencies: (options?: InstallOptions) => Promise<CommandResult>;
export default installDependencies;
