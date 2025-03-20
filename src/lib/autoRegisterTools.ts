/**
 * Auto Register Tools
 * Automatically registers tools from the tools directory
 */

import fs from 'fs';
import path from 'path';
import { ToolDefinition } from '../types';
import toolRegistry from './toolRegistry';

/**
 * Auto-registers all tools from the tools directory
 * @returns Array of registered tool definitions
 */
const autoRegisterTools = (): ToolDefinition[] => {
  const toolsDir = path.join(__dirname, '..', 'tools');

  // Check if tools directory exists
  if (!fs.existsSync(toolsDir)) {
    console.error(`Tools directory not found: ${toolsDir}`);
    return [];
  }

  const registeredTools: ToolDefinition[] = [];

  try {
    // Get all tool directories
    const toolDirs = fs.readdirSync(toolsDir);

    // Load and register each tool
    for (const dir of toolDirs) {
      const toolPath = path.join(toolsDir, dir);

      // Skip if it's not a directory
      if (!fs.statSync(toolPath).isDirectory()) {
        continue;
      }

      const indexPath = path.join(toolPath, 'index.js');

      // Skip if index.js doesn't exist
      if (!fs.existsSync(indexPath)) {
        console.warn(`No index.js found in tool directory: ${toolPath}`);
        continue;
      }

      try {
        // Load the tool
        const tool = require(indexPath).default || require(indexPath);

        // Register the tool
        if (toolRegistry.registerTool(tool)) {
          registeredTools.push(tool);
        }
      } catch (error) {
        console.error(`Error loading tool from ${indexPath}:`, error);
      }
    }
  } catch (error) {
    console.error('Error auto-registering tools:', error);
  }

  return registeredTools;
};

export default autoRegisterTools;
