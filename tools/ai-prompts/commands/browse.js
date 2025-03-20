/**
 * Browse Prompts Command
 * Provides an interactive interface to browse and select prompts
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const prompts = require('../data/prompts');
const showPrompt = require('./show');
const copyPrompt = require('./copy');

/**
 * Interactively browse and select prompts
 * @returns {Promise<boolean>} Whether the browsing operation completed successfully
 */
const browsePrompts = async () => {
  try {
    // First, let the user select a category
    const categories = [...new Set(prompts.map(p => p.category))];

    if (categories.length === 0) {
      console.log(chalk.yellow('\nNo prompt categories found. Add some prompts first.\n'));
      return false;
    }

    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Select a prompt category:',
        choices: categories,
      }
    ]);

    // Then, let the user select a prompt within that category
    const categoryPrompts = prompts.filter(p => p.category === category);

    if (categoryPrompts.length === 0) {
      console.log(chalk.yellow(`\nNo prompts found in category "${category}".\n`));
      return false;
    }

    const { promptId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'promptId',
        message: 'Select a prompt:',
        choices: categoryPrompts.map(p => ({ name: p.name, value: p.id })),
      }
    ]);

    // Show the selected prompt
    const promptFound = showPrompt(promptId);

    if (!promptFound) {
      return false;
    }

    // Ask if they want to copy it
    const { copy } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'copy',
        message: 'Do you want to copy this prompt to clipboard?',
        default: true,
      }
    ]);

    if (copy) {
      await copyPrompt(promptId);
    }

    return true;
  } catch (error) {
    console.error(chalk.red('\nError during interactive browsing:'), error);
    return false;
  }
};

module.exports = browsePrompts;
