/**
 * Automatically Register Tools
 * This module discovers and registers all tools in the tools directory
 */

const fs = require('fs');
const path = require('path');
const pmdt = require('../index');

// Get the tools directory path
const toolsDir = path.join(__dirname, '..', 'tools');

// Check if tools directory exists
if (!fs.existsSync(toolsDir)) {
  console.warn(`Tools directory not found: ${toolsDir}`);
  return;
}

// Get all subdirectories in the tools directory
const toolDirs = fs
  .readdirSync(toolsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Register each tool
toolDirs.forEach(toolDir => {
  const toolPath = path.join(toolsDir, toolDir, 'index.js');

  if (fs.existsSync(toolPath)) {
    try {
      // Require the tool module
      const tool = require(toolPath);

      // Register the tool
      if (pmdt.registerTool(tool)) {
        // Successfully registered
      } else {
        console.warn(`Failed to register tool from ${toolPath}`);
      }
    } catch (error) {
      console.error(`Error registering tool from ${toolPath}:`, error);
    }
  }
});

module.exports = {};
