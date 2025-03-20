/**
 * Copy Prompt Command
 * Copies a specific prompt to the clipboard
 */

const chalk = require('chalk');
const prompts = require('../data/prompts');
const { copyToClipboard } = require('../utils/clipboard');

/**
 * Copies a prompt to the clipboard
 * @param {string} promptId - The ID of the prompt to copy
 * @returns {Promise<boolean>} Whether the prompt was found and copied
 */
const copyPrompt = async (promptId) => {
  const prompt = prompts.find(p => p.id === promptId);

  if (!prompt) {
    console.log(chalk.red(`\nPrompt with ID "${promptId}" not found.`));
    console.log(`Run ${chalk.cyan('pmdt ai-prompts list')} to see all available prompts.\n`);
    return false;
  }

  const result = copyToClipboard(prompt.prompt);

  if (result.success) {
    console.log(chalk.green(`\nPrompt "${prompt.name}" copied to clipboard!\n`));
  } else {
    // Clipboard access failed, just show the prompt
    console.log(chalk.yellow('\nCould not copy to clipboard automatically.'));
    console.log(chalk.cyan('\nHere is the prompt to manually copy:'));
    console.log(chalk.white(`\n${prompt.prompt}\n`));

    if (result.error) {
      console.error(chalk.red('Error details:'), result.error.message);
    }
  }

  return true;
};

module.exports = copyPrompt;
