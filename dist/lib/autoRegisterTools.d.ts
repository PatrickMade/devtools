/**
 * Auto Register Tools
 * Automatically registers tools from the tools directory
 */
import { ToolDefinition } from '../types';
/**
 * Auto-registers all tools from the tools directory
 * @returns Array of registered tool definitions
 */
declare const autoRegisterTools: () => ToolDefinition[];
export default autoRegisterTools;
