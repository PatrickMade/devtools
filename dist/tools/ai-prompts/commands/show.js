"use strict";
/**
 * Show Prompt Command
 * Displays a specific prompt by ID
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("../data/prompts"));
/**
 * Shows a specific prompt by ID
 * @param promptId - The ID of the prompt to show
 * @returns Whether the prompt was found and displayed
 */
const showPrompt = (promptId) => {
    const prompt = prompts_1.default.find(p => p.id === promptId);
    if (!prompt) {
        console.log(chalk_1.default.red(`\nPrompt with ID "${promptId}" not found.`));
        console.log(`Run ${chalk_1.default.cyan('pmdt ai-prompts list')} to see all available prompts.\n`);
        return false;
    }
    console.log(chalk_1.default.blue.bold(`\n${prompt.name} (${prompt.category})`));
    console.log(chalk_1.default.gray(prompt.description));
    console.log(chalk_1.default.cyan('\nPrompt:'));
    console.log(chalk_1.default.white(`\n${prompt.prompt}\n`));
    // Print instructions
    console.log(`Run ${chalk_1.default.cyan(`pmdt ai-prompts copy ${promptId}`)} to copy this prompt to clipboard.\n`);
    return true;
};
exports.default = showPrompt;
