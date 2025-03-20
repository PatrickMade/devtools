"use strict";
/**
 * List Prompts Command
 * Lists all available AI prompts by category
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("../data/prompts"));
/**
 * Lists all available prompts
 * @returns void
 */
const listPrompts = () => {
    console.log(chalk_1.default.blue.bold('\nAvailable AI Prompts:'));
    console.log(chalk_1.default.gray('Copy these prompts to use with Cursor or other AI coding assistants\n'));
    // Group prompts by category
    const categorizedPrompts = prompts_1.default.reduce((acc, prompt) => {
        if (!acc[prompt.category]) {
            acc[prompt.category] = [];
        }
        acc[prompt.category].push(prompt);
        return acc;
    }, {});
    // Display prompts by category
    Object.keys(categorizedPrompts).forEach(category => {
        console.log(chalk_1.default.yellow(`\n${category}:`));
        categorizedPrompts[category].forEach(prompt => {
            console.log(`  ${chalk_1.default.green(prompt.id)}: ${chalk_1.default.white(prompt.name)}`);
            console.log(`    ${chalk_1.default.gray(prompt.description)}`);
        });
    });
    console.log('\nRun', chalk_1.default.cyan('pmdt ai-prompts show <prompt-id>'), 'to view a specific prompt');
    console.log('Run', chalk_1.default.cyan('pmdt ai-prompts copy <prompt-id>'), 'to copy a prompt to clipboard\n');
};
exports.default = listPrompts;
