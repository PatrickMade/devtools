/**
 * AI Prompts Tool
 * This tool provides access to a library of AI prompts for code-related tasks
 */

import chalk from 'chalk';
import { CommandResult, ToolDefinition } from '../../types';
import browsePrompts from './commands/browse';
import copyPrompt from './commands/copy';
import listPrompts from './commands/list';
import showPrompt from './commands/show';

/**
 * Options for the AI prompts tool
 */
interface AIPromptsOptions {
  command?: string;
  prompt?: string;
}

/**
 * Execute the AI prompts tool
 * @param options - Tool options
 * @returns Tool execution result
 */
const execute = async (options: AIPromptsOptions = {}): Promise<CommandResult> => {
  const { command = 'list', prompt = '' } = options;

  try {
    switch (command) {
      case 'list':
        listPrompts();
        return { success: true };

      case 'show':
        if (!prompt) {
          console.log(chalk.red('\nError: No prompt ID specified.'));
          console.log(`Usage: ${chalk.cyan('pmdt ai-prompts show <prompt-id>')}\n`);
          return { success: false, error: new Error('No prompt ID specified') };
        }

        return { success: showPrompt(prompt) };

      case 'copy':
        if (!prompt) {
          console.log(chalk.red('\nError: No prompt ID specified.'));
          console.log(`Usage: ${chalk.cyan('pmdt ai-prompts copy <prompt-id>')}\n`);
          return { success: false, error: new Error('No prompt ID specified') };
        }

        return { success: await copyPrompt(prompt) };

      case 'browse':
        return { success: await browsePrompts() };

      default:
        console.log(chalk.red(`\nError: Unknown command "${command}"`));
        console.log(chalk.blue('Available commands:'));
        console.log(`  ${chalk.cyan('list')}: List all available prompts`);
        console.log(`  ${chalk.cyan('show <prompt-id>')}: Show a specific prompt`);
        console.log(`  ${chalk.cyan('copy <prompt-id>')}: Copy a prompt to clipboard`);
        console.log(`  ${chalk.cyan('browse')}: Browse prompts interactively\n`);

        return { success: false, error: new Error(`Unknown command: ${command}`) };
    }
  } catch (error) {
    console.error(chalk.red('Error executing AI prompts tool:'), error);
    return { success: false, error: error as Error };
  }
};

// Export the tool definition
const aiPromptsTools: ToolDefinition = {
  id: 'ai-prompts',
  name: 'AI Prompts Library',
  description: 'A collection of AI prompts for various coding tasks',
  execute,
  options: {
    command: {
      description: 'Command to execute (list, show, copy, browse)',
      default: 'list',
      choices: ['list', 'show', 'copy', 'browse'],
    },
    prompt: {
      description: 'Prompt ID for show and copy commands',
      default: '',
    },
  },
};

export default aiPromptsTools;
