#!/usr/bin/env node

/**
 * PMDT CLI - Main CLI for Patrick Made's Dev Tools
 */

import chalk from 'chalk';
import { program } from 'commander';
import pmdt from '../index';

// Set CLI version (this will be replaced with the actual version from package.json at build time)
program.version('1.0.10');

// Get all registered tools
const tools = pmdt.getTools();

// Register commands for each tool
tools.forEach(tool => {
  const command = program.command(tool.id);
  command.description(tool.description);

  // Add options for the tool
  if (tool.options) {
    Object.entries(tool.options).forEach(([optionName, optionConfig]) => {
      const optionFlag =
        optionConfig.type === 'boolean' ? `--${optionName}` : `--${optionName} <value>`;

      const optionDescription = optionConfig.choices
        ? `${optionConfig.description} (choices: ${optionConfig.choices.join(', ')})`
        : optionConfig.description;

      command.option(optionFlag, optionDescription, optionConfig.default);
    });
  }

  // Set action handler
  command.action(async options => {
    try {
      const result = await pmdt.runTool(tool.id, options);

      if (!result.success) {
        console.error(
          chalk.red(`Error executing ${tool.name}: ${result.error?.message || 'Unknown error'}`)
        );
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red(`Error executing ${tool.name}:`), error);
      process.exit(1);
    }
  });
});

// Add help command
program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.outputHelp();
  });

// Add list command
program
  .command('list')
  .description('List all available tools')
  .action(() => {
    console.log(chalk.blue.bold('\nAvailable tools:'));
    tools.forEach(tool => {
      console.log(`  ${chalk.green(tool.id)}: ${chalk.white(tool.description)}`);
    });
    console.log('');
  });

// Parse arguments
program.parse(process.argv);

// If no args, show help
if (process.argv.length === 2) {
  console.log(chalk.blue.bold("PMDT - Patrick Made's Dev Tools"));
  console.log(chalk.gray('Run a command to get started\n'));
  program.outputHelp();
}
