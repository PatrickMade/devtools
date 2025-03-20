/**
 * Show Prompt Command
 * Displays a specific prompt by ID
 */

const chalk = require('chalk');
const prompts = require('../data/prompts');

/**
 * Shows a specific prompt by ID
 * @param {string} promptId - The ID of the prompt to show
 * @returns {boolean} Whether the prompt was found and displayed
 */
const showPrompt = (promptId) => {
  const prompt = prompts.find(p => p.id === promptId);

  if (!prompt) {
    console.log(chalk.red(`\nPrompt with ID "${promptId}" not found.`));
    console.log(`Run ${chalk.cyan('pmdt ai-prompts list')} to see all available prompts.\n`);
    return false;
  }

  console.log(chalk.blue.bold(`\n${prompt.name} (${prompt.category})`));
  console.log(chalk.gray(prompt.description));
  console.log(chalk.cyan('\nPrompt:'));
  console.log(chalk.white(`\n${prompt.prompt}\n`));

  // Print instructions
  console.log(`Run ${chalk.cyan(`pmdt ai-prompts copy ${promptId}`)} to copy this prompt to clipboard.\n`);
  return true;
};

module.exports = showPrompt;
