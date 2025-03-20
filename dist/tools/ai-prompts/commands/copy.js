"use strict";
/**
 * Copy Prompt Command
 * Copies a specific prompt to the clipboard
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("../data/prompts"));
const clipboard_1 = require("../utils/clipboard");
/**
 * Copies a prompt to the clipboard
 * @param promptId - The ID of the prompt to copy
 * @returns Whether the prompt was found and copied
 */
const copyPrompt = async (promptId) => {
    const prompt = prompts_1.default.find(p => p.id === promptId);
    if (!prompt) {
        console.log(chalk_1.default.red(`\nPrompt with ID "${promptId}" not found.`));
        console.log(`Run ${chalk_1.default.cyan('pmdt ai-prompts list')} to see all available prompts.\n`);
        return false;
    }
    const result = (0, clipboard_1.copyToClipboard)(prompt.prompt);
    if (result.success) {
        console.log(chalk_1.default.green(`\nPrompt "${prompt.name}" copied to clipboard!\n`));
    }
    else {
        // Clipboard access failed, just show the prompt
        console.log(chalk_1.default.yellow('\nCould not copy to clipboard automatically.'));
        console.log(chalk_1.default.cyan('\nHere is the prompt to manually copy:'));
        console.log(chalk_1.default.white(`\n${prompt.prompt}\n`));
        if (result.error) {
            console.error(chalk_1.default.red('Error details:'), result.error.message);
        }
    }
    return true;
};
exports.default = copyPrompt;
