#!/usr/bin/env node

/**
 * Patrick Made's Dev Tools (PMDT) CLI
 * Main CLI entry point that provides access to all tools
 */

const { program } = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');
const pmdt = require('../index');

// Register all tools from the tools directory
require('../lib/autoRegisterTools');

// Setup the CLI program
program
  .name('pmdt')
  .description(
    chalk.blue(
      "Patrick Made's Dev Tools - A collection of utilities for React/React Native development"
    )
  )
  .version(packageJson.version, '-v, --version', 'Output the current version');

// Get all registered tools and add them as commands
const tools = pmdt.getTools();

if (tools.length === 0) {
  console.warn(chalk.yellow('No tools registered. Make sure tools are properly loaded.'));
}

// Add commands for each tool
tools.forEach(tool => {
  const command = program.command(tool.id);

  command.description(tool.description);

  // Add options if tool has defined them
  if (tool.options) {
    Object.entries(tool.options).forEach(([optionName, optionConfig]) => {
      const optionFlag =
        optionConfig.type === 'boolean' ? `--${optionName}` : `--${optionName} <value>`;

      const description = optionConfig.choices
        ? `${optionConfig.description} (choices: ${optionConfig.choices.join(', ')})`
        : optionConfig.description;

      command.option(optionFlag, description, optionConfig.default);
    });
  }

  // Set the action for the command
  command.action(async options => {
    try {
      await pmdt.runTool(tool.id, options);
    } catch (error) {
      console.error(chalk.red(`Error running tool "${tool.id}": ${error.message}`));
      process.exit(1);
    }
  });
});

// Add a list command to show all available tools
program
  .command('list')
  .description('List all available tools')
  .action(() => {
    console.log(chalk.blue.bold('\nAvailable tools:'));
    tools.forEach(tool => {
      console.log(`${chalk.green(tool.id)}: ${tool.description}`);
    });
    console.log('');
  });

// Parse the command line arguments
program.parse(process.argv);

// If no arguments were provided, show help
if (process.argv.length <= 2) {
  program.help();
}
