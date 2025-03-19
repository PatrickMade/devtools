/**
 * Tool Registry
 * Manages registration and retrieval of tools in the package
 */

// In-memory store for all registered tools
const tools = new Map();

/**
 * Validate a tool definition object
 * @param {Object} toolDef - The tool definition to validate
 * @returns {boolean} Whether the tool definition is valid
 */
const validateToolDefinition = toolDef => {
  if (!toolDef || typeof toolDef !== 'object') {
    return false;
  }

  const requiredProps = ['id', 'name', 'description', 'execute'];
  return requiredProps.every(prop => {
    if (!toolDef[prop]) {
      console.error(`Tool definition missing required property: ${prop}`);
      return false;
    }

    if (prop === 'execute' && typeof toolDef[prop] !== 'function') {
      console.error('Tool execute property must be a function');
      return false;
    }

    return true;
  });
};

/**
 * Register a tool in the registry
 * @param {Object} toolDefinition - The definition of the tool to register
 * @returns {boolean} Success status
 */
const registerTool = toolDefinition => {
  if (!validateToolDefinition(toolDefinition)) {
    return false;
  }

  if (tools.has(toolDefinition.id)) {
    console.warn(`Tool with ID "${toolDefinition.id}" already exists and will be overwritten`);
  }

  tools.set(toolDefinition.id, toolDefinition);
  return true;
};

/**
 * Get a specific tool by its ID
 * @param {string} toolId - The ID of the tool to retrieve
 * @returns {Object|null} The tool definition or null if not found
 */
const getTool = toolId => {
  if (!toolId || typeof toolId !== 'string') {
    return null;
  }

  return tools.get(toolId) || null;
};

/**
 * Get all registered tools
 * @returns {Array} Array of tool definitions
 */
const getTools = () => {
  return Array.from(tools.values());
};

/**
 * Remove a tool from the registry
 * @param {string} toolId - The ID of the tool to remove
 * @returns {boolean} Whether the tool was successfully removed
 */
const removeTool = toolId => {
  if (!toolId || !tools.has(toolId)) {
    return false;
  }

  return tools.delete(toolId);
};

module.exports = {
  registerTool,
  getTool,
  getTools,
  removeTool,
};
