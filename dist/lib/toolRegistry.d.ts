/**
 * Tool Registry
 * Registry for managing tool definitions
 */
import { ToolDefinition } from '../types';
/**
 * Get all registered tools
 * @returns Array of tool definitions
 */
export declare const getTools: () => ToolDefinition[];
/**
 * Get a specific tool by its ID
 * @param toolId - The ID of the tool to retrieve
 * @returns The tool definition or null if not found
 */
export declare const getTool: (toolId: string) => ToolDefinition | null;
/**
 * Register a new tool
 * @param toolDefinition - The tool definition to register
 * @returns Success status
 */
export declare const registerTool: (toolDefinition: ToolDefinition) => boolean;
/**
 * Unregister a tool
 * @param toolId - The ID of the tool to unregister
 * @returns Success status
 */
export declare const unregisterTool: (toolId: string) => boolean;
declare const _default: {
    getTools: () => ToolDefinition[];
    getTool: (toolId: string) => ToolDefinition | null;
    registerTool: (toolDefinition: ToolDefinition) => boolean;
    unregisterTool: (toolId: string) => boolean;
};
export default _default;
