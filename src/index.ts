/**
 * Patrick Made's Dev Tools (PMDT)
 * A collection of development tools and utilities for React and React Native projects
 */

import autoRegisterTools from './lib/autoRegisterTools';
import toolRegistry from './lib/toolRegistry';
import { CommandResult, ToolDefinition } from './types';

// Auto-register tools
autoRegisterTools();

/**
 * Main module exports
 */
export default {
  /**
   * Get all registered tools
   * @returns Array of tool definitions
   */
  getTools: (): ToolDefinition[] => toolRegistry.getTools(),

  /**
   * Get a specific tool by its ID
   * @param toolId - The ID of the tool to retrieve
   * @returns The tool definition or null if not found
   */
  getTool: (toolId: string): ToolDefinition | null => toolRegistry.getTool(toolId),

  /**
   * Register a new tool
   * @param toolDefinition - The tool definition object
   * @returns Success status
   */
  registerTool: (toolDefinition: ToolDefinition): boolean =>
    toolRegistry.registerTool(toolDefinition),

  /**
   * Run a specific tool by its ID
   * @param toolId - The ID of the tool to run
   * @param options - Options to pass to the tool
   * @returns Result from the tool execution
   */
  runTool: async (toolId: string, options = {}): Promise<CommandResult> => {
    const tool = toolRegistry.getTool(toolId);
    if (!tool) {
      throw new Error(`Tool with ID "${toolId}" not found`);
    }

    return tool.execute(options);
  },
};
