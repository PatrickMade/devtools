"use strict";
/**
 * Browse Prompts Command
 * Provides an interactive interface to browse and select prompts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const prompts_1 = __importDefault(require("../data/prompts"));
const copy_1 = __importDefault(require("./copy"));
const show_1 = __importDefault(require("./show"));
/**
 * Interactively browse and select prompts
 * @returns Whether the browsing operation completed successfully
 */
const browsePrompts = async () => {
    try {
        // First, let the user select a category
        const categories = [...new Set(prompts_1.default.map(p => p.category))];
        if (categories.length === 0) {
            console.log(chalk_1.default.yellow('\nNo prompt categories found. Add some prompts first.\n'));
            return false;
        }
        const { category } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'category',
                message: 'Select a prompt category:',
                choices: categories,
            },
        ]);
        // Then, let the user select a prompt within that category
        const categoryPrompts = prompts_1.default.filter(p => p.category === category);
        if (categoryPrompts.length === 0) {
            console.log(chalk_1.default.yellow(`\nNo prompts found in category "${category}".\n`));
            return false;
        }
        const { promptId } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'promptId',
                message: 'Select a prompt:',
                choices: categoryPrompts.map(p => ({ name: p.name, value: p.id })),
            },
        ]);
        // Show the selected prompt
        const promptFound = (0, show_1.default)(promptId);
        if (!promptFound) {
            return false;
        }
        // Ask if they want to copy it
        const { copy } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'copy',
                message: 'Do you want to copy this prompt to clipboard?',
                default: true,
            },
        ]);
        if (copy) {
            await (0, copy_1.default)(promptId);
        }
        return true;
    }
    catch (error) {
        console.error(chalk_1.default.red('\nError during interactive browsing:'), error);
        return false;
    }
};
exports.default = browsePrompts;
