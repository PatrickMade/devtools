"use strict";
/**
 * Tool Registry
 * Registry for managing tool definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterTool = exports.registerTool = exports.getTool = exports.getTools = void 0;
// Store for registered tools
const tools = new Map();
/**
 * Get all registered tools
 * @returns Array of tool definitions
 */
const getTools = () => {
    return Array.from(tools.values());
};
exports.getTools = getTools;
/**
 * Get a specific tool by its ID
 * @param toolId - The ID of the tool to retrieve
 * @returns The tool definition or null if not found
 */
const getTool = (toolId) => {
    return tools.has(toolId) ? tools.get(toolId) : null;
};
exports.getTool = getTool;
/**
 * Register a new tool
 * @param toolDefinition - The tool definition to register
 * @returns Success status
 */
const registerTool = (toolDefinition) => {
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
exports.registerTool = registerTool;
/**
 * Unregister a tool
 * @param toolId - The ID of the tool to unregister
 * @returns Success status
 */
const unregisterTool = (toolId) => {
    if (!tools.has(toolId)) {
        console.error(`Tool with ID "${toolId}" not found`);
        return false;
    }
    tools.delete(toolId);
    return true;
};
exports.unregisterTool = unregisterTool;
exports.default = {
    getTools: exports.getTools,
    getTool: exports.getTool,
    registerTool: exports.registerTool,
    unregisterTool: exports.unregisterTool,
};
