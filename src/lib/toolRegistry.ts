/**
 * Tool Registry
 * Registry for managing tool definitions
 */

import { ToolDefinition } from '../types';

// Store for registered tools
const tools: Map<string, ToolDefinition> = new Map();

/**
 * Get all registered tools
 * @returns Array of tool definitions
 */
export const getTools = (): ToolDefinition[] => {
  return Array.from(tools.values());
};

/**
 * Get a specific tool by its ID
 * @param toolId - The ID of the tool to retrieve
 * @returns The tool definition or null if not found
 */
export const getTool = (toolId: string): ToolDefinition | null => {
  return tools.has(toolId) ? tools.get(toolId)! : null;
};

/**
 * Register a new tool
 * @param toolDefinition - The tool definition to register
 * @returns Success status
 */
export const registerTool = (toolDefinition: ToolDefinition): boolean => {
  if (!toolDefinition.id) {
    console.error('Tool ID is required');
    return false;
  }

  if (tools.has(toolDefinition.id)) {
    console.error(`Tool with ID "${toolDefinition.id}" already exists`);
    return false;
  }

  tools.set(toolDefinition.id, toolDefinition);
  return true;
};

/**
 * Unregister a tool
 * @param toolId - The ID of the tool to unregister
 * @returns Success status
 */
export const unregisterTool = (toolId: string): boolean => {
  if (!tools.has(toolId)) {
    console.error(`Tool with ID "${toolId}" not found`);
    return false;
  }

  tools.delete(toolId);
  return true;
};

export default {
  getTools,
  getTool,
  registerTool,
  unregisterTool,
};
