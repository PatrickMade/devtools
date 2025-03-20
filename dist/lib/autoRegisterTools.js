"use strict";
/**
 * Auto Register Tools
 * Automatically registers tools from the tools directory
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const toolRegistry_1 = __importDefault(require("./toolRegistry"));
/**
 * Auto-registers all tools from the tools directory
 * @returns Array of registered tool definitions
 */
const autoRegisterTools = () => {
    const toolsDir = path_1.default.join(__dirname, '..', 'tools');
    // Check if tools directory exists
    if (!fs_1.default.existsSync(toolsDir)) {
        console.error(`Tools directory not found: ${toolsDir}`);
        return [];
    }
    const registeredTools = [];
    try {
        // Get all tool directories
        const toolDirs = fs_1.default.readdirSync(toolsDir);
        // Load and register each tool
        for (const dir of toolDirs) {
            const toolPath = path_1.default.join(toolsDir, dir);
            // Skip if it's not a directory
            if (!fs_1.default.statSync(toolPath).isDirectory()) {
                continue;
            }
            const indexPath = path_1.default.join(toolPath, 'index.js');
            // Skip if index.js doesn't exist
            if (!fs_1.default.existsSync(indexPath)) {
                console.warn(`No index.js found in tool directory: ${toolPath}`);
                continue;
            }
            try {
                // Load the tool
                const tool = require(indexPath).default || require(indexPath);
                // Register the tool
                if (toolRegistry_1.default.registerTool(tool)) {
                    registeredTools.push(tool);
                }
            }
            catch (error) {
                console.error(`Error loading tool from ${indexPath}:`, error);
            }
        }
    }
    catch (error) {
        console.error('Error auto-registering tools:', error);
    }
    return registeredTools;
};
exports.default = autoRegisterTools;
