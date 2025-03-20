/**
 * AI Prompts Library Tool
 * This tool provides a library of useful AI prompts for various coding tasks
 * Users can browse, search, and copy prompts to use with Cursor or other LLMs
 */

const chalk = require('chalk');

// Import commands
const listPrompts = require('./commands/list');
const showPrompt = require('./commands/show');
const copyPrompt = require('./commands/copy');
const browsePrompts = require('./commands/browse');

/**
 * Execute the AI prompts library tool
 * @param {Object} options - Tool options
 * @returns {Promise<Object>} Tool execution result
 */
const execute = async (options = {}) => {
  const { action = 'list', promptId = null } = options;

  try {
    switch (action) {
      case 'list':
        listPrompts();
        break;
      case 'show':
        if (!promptId) {
          console.log(chalk.red('\nPlease specify a prompt ID.'));
          console.log(`Example: ${chalk.cyan('pmdt ai-prompts show refactor')}\n`);
          return { success: false };
        }
        showPrompt(promptId);
        break;
      case 'copy':
        if (!promptId) {
          console.log(chalk.red('\nPlease specify a prompt ID.'));
          console.log(`Example: ${chalk.cyan('pmdt ai-prompts copy refactor')}\n`);
          return { success: false };
        }
        await copyPrompt(promptId);
        break;
      case 'browse':
        await browsePrompts();
        break;
      default:
        console.log(chalk.red(`\nUnknown action: ${action}`));
        listPrompts();
        return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error(chalk.red('Error executing command:'), error);
    return { success: false, error };
  }
};

// Export the tool definition
module.exports = {
  id: 'ai-prompts',
  name: 'AI Prompts Library',
  description: 'Access a library of useful AI prompts for coding tasks',
  execute,
  options: {
    action: {
      description: 'Action to perform (list, show, copy, browse)',
      default: 'list',
      choices: ['list', 'show', 'copy', 'browse'],
    },
    promptId: {
      description: 'ID of the prompt to show or copy',
      default: null,
    }
  },
};
