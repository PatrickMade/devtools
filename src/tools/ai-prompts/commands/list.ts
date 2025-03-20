/**
 * List Prompts Command
 * Lists all available AI prompts by category
 */

import chalk from 'chalk';
import { Prompt } from '../../../types';
import prompts from '../data/prompts';

/**
 * Lists all available prompts
 * @returns void
 */
const listPrompts = (): void => {
  console.log(chalk.blue.bold('\nAvailable AI Prompts:'));
  console.log(chalk.gray('Copy these prompts to use with Cursor or other AI coding assistants\n'));

  // Group prompts by category
  const categorizedPrompts = prompts.reduce<Record<string, Prompt[]>>((acc, prompt) => {
    if (!acc[prompt.category]) {
      acc[prompt.category] = [];
    }
    acc[prompt.category].push(prompt);
    return acc;
  }, {});

  // Display prompts by category
  Object.keys(categorizedPrompts).forEach(category => {
    console.log(chalk.yellow(`\n${category}:`));
    categorizedPrompts[category].forEach(prompt => {
      console.log(`  ${chalk.green(prompt.id)}: ${chalk.white(prompt.name)}`);
      console.log(`    ${chalk.gray(prompt.description)}`);
    });
  });

  console.log('\nRun', chalk.cyan('pmdt ai-prompts show <prompt-id>'), 'to view a specific prompt');
  console.log(
    'Run',
    chalk.cyan('pmdt ai-prompts copy <prompt-id>'),
    'to copy a prompt to clipboard\n'
  );
};

export default listPrompts;
