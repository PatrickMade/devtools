#!/usr/bin/env node
"use strict";
/**
 * PMDT CLI - Main CLI for Patrick Made's Dev Tools
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const index_1 = __importDefault(require("../index"));
// Set CLI version (this will be replaced with the actual version from package.json at build time)
commander_1.program.version('1.0.10');
// Get all registered tools
const tools = index_1.default.getTools();
// Register commands for each tool
tools.forEach(tool => {
    const command = commander_1.program.command(tool.id);
    command.description(tool.description);
    // Add options for the tool
    if (tool.options) {
        Object.entries(tool.options).forEach(([optionName, optionConfig]) => {
            const optionFlag = optionConfig.type === 'boolean' ? `--${optionName}` : `--${optionName} <value>`;
            const optionDescription = optionConfig.choices
                ? `${optionConfig.description} (choices: ${optionConfig.choices.join(', ')})`
                : optionConfig.description;
            command.option(optionFlag, optionDescription, optionConfig.default);
        });
    }
    // Set action handler
    command.action(async (options) => {
        var _a;
        try {
            const result = await index_1.default.runTool(tool.id, options);
            if (!result.success) {
                console.error(chalk_1.default.red(`Error executing ${tool.name}: ${((_a = result.error) === null || _a === void 0 ? void 0 : _a.message) || 'Unknown error'}`));
                process.exit(1);
            }
        }
        catch (error) {
            console.error(chalk_1.default.red(`Error executing ${tool.name}:`), error);
            process.exit(1);
        }
    });
});
// Add help command
commander_1.program
    .command('help')
    .description('Display help information')
    .action(() => {
    commander_1.program.outputHelp();
});
// Add list command
commander_1.program
    .command('list')
    .description('List all available tools')
    .action(() => {
    console.log(chalk_1.default.blue.bold('\nAvailable tools:'));
    tools.forEach(tool => {
        console.log(`  ${chalk_1.default.green(tool.id)}: ${chalk_1.default.white(tool.description)}`);
    });
    console.log('');
});
// Parse arguments
commander_1.program.parse(process.argv);
// If no args, show help
if (process.argv.length === 2) {
    console.log(chalk_1.default.blue.bold("PMDT - Patrick Made's Dev Tools"));
    console.log(chalk_1.default.gray('Run a command to get started\n'));
    commander_1.program.outputHelp();
}
