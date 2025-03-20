/**
 * Patrick Made's Dev Tools (PMDT)
 * A collection of development tools and utilities for React and React Native projects
 */
import { CommandResult, ToolDefinition } from './types';
/**
 * Main module exports
 */
declare const _default: {
    /**
     * Get all registered tools
     * @returns Array of tool definitions
     */
    getTools: () => ToolDefinition[];
    /**
     * Get a specific tool by its ID
     * @param toolId - The ID of the tool to retrieve
     * @returns The tool definition or null if not found
     */
    getTool: (toolId: string) => ToolDefinition | null;
    /**
     * Register a new tool
     * @param toolDefinition - The tool definition object
     * @returns Success status
     */
    registerTool: (toolDefinition: ToolDefinition) => boolean;
    /**
     * Run a specific tool by its ID
     * @param toolId - The ID of the tool to run
     * @param options - Options to pass to the tool
     * @returns Result from the tool execution
     */
    runTool: (toolId: string, options?: {}) => Promise<CommandResult>;
};
export default _default;
