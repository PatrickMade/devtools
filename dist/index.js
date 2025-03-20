"use strict";
/**
 * Patrick Made's Dev Tools (PMDT)
 * A collection of development tools and utilities for React and React Native projects
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autoRegisterTools_1 = __importDefault(require("./lib/autoRegisterTools"));
const toolRegistry_1 = __importDefault(require("./lib/toolRegistry"));
// Auto-register tools
(0, autoRegisterTools_1.default)();
/**
 * Main module exports
 */
exports.default = {
    /**
     * Get all registered tools
     * @returns Array of tool definitions
     */
    getTools: () => toolRegistry_1.default.getTools(),
    /**
     * Get a specific tool by its ID
     * @param toolId - The ID of the tool to retrieve
     * @returns The tool definition or null if not found
     */
    getTool: (toolId) => toolRegistry_1.default.getTool(toolId),
    /**
     * Register a new tool
     * @param toolDefinition - The tool definition object
     * @returns Success status
     */
    registerTool: (toolDefinition) => toolRegistry_1.default.registerTool(toolDefinition),
    /**
     * Run a specific tool by its ID
     * @param toolId - The ID of the tool to run
     * @param options - Options to pass to the tool
     * @returns Result from the tool execution
     */
    runTool: async (toolId, options = {}) => {
        const tool = toolRegistry_1.default.getTool(toolId);
        if (!tool) {
            throw new Error(`Tool with ID "${toolId}" not found`);
        }
        return tool.execute(options);
    },
};
