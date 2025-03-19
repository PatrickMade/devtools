/**
 * Patrick Made's Dev Tools (PMDT)
 * A collection of development tools and utilities for React and React Native projects
 */

const toolRegistry = require('./lib/toolRegistry');

module.exports = {
  /**
   * Get all registered tools
   * @returns {Array} Array of tool definitions
   */
  getTools: () => toolRegistry.getTools(),

  /**
   * Get a specific tool by its ID
   * @param {string} toolId - The ID of the tool to retrieve
   * @returns {Object|null} The tool definition or null if not found
   */
  getTool: toolId => toolRegistry.getTool(toolId),

  /**
   * Register a new tool
   * @param {Object} toolDefinition - The tool definition object
   * @returns {boolean} Success status
   */
  registerTool: toolDefinition => toolRegistry.registerTool(toolDefinition),

  /**
   * Run a specific tool by its ID
   * @param {string} toolId - The ID of the tool to run
   * @param {Object} options - Options to pass to the tool
   * @returns {Promise<any>} Result from the tool execution
   */
  runTool: async (toolId, options = {}) => {
    const tool = toolRegistry.getTool(toolId);
    if (!tool) {
      throw new Error(`Tool with ID "${toolId}" not found`);
    }

    return tool.execute(options);
  },
};
