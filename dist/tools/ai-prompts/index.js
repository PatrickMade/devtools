"use strict";
/**
 * AI Prompts Tool
 * This tool provides access to a library of AI prompts for code-related tasks
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const browse_1 = __importDefault(require("./commands/browse"));
const copy_1 = __importDefault(require("./commands/copy"));
const list_1 = __importDefault(require("./commands/list"));
const show_1 = __importDefault(require("./commands/show"));
/**
 * Execute the AI prompts tool
 * @param options - Tool options
 * @returns Tool execution result
 */
const execute = async (options = {}) => {
    const { command = 'list', prompt = '' } = options;
    try {
        switch (command) {
            case 'list':
                (0, list_1.default)();
                return { success: true };
            case 'show':
                if (!prompt) {
                    console.log(chalk_1.default.red('\nError: No prompt ID specified.'));
                    console.log(`Usage: ${chalk_1.default.cyan('pmdt ai-prompts show <prompt-id>')}\n`);
                    return { success: false, error: new Error('No prompt ID specified') };
                }
                return { success: (0, show_1.default)(prompt) };
            case 'copy':
                if (!prompt) {
                    console.log(chalk_1.default.red('\nError: No prompt ID specified.'));
                    console.log(`Usage: ${chalk_1.default.cyan('pmdt ai-prompts copy <prompt-id>')}\n`);
                    return { success: false, error: new Error('No prompt ID specified') };
                }
                return { success: await (0, copy_1.default)(prompt) };
            case 'browse':
                return { success: await (0, browse_1.default)() };
            default:
                console.log(chalk_1.default.red(`\nError: Unknown command "${command}"`));
                console.log(chalk_1.default.blue('Available commands:'));
                console.log(`  ${chalk_1.default.cyan('list')}: List all available prompts`);
                console.log(`  ${chalk_1.default.cyan('show <prompt-id>')}: Show a specific prompt`);
                console.log(`  ${chalk_1.default.cyan('copy <prompt-id>')}: Copy a prompt to clipboard`);
                console.log(`  ${chalk_1.default.cyan('browse')}: Browse prompts interactively\n`);
                return { success: false, error: new Error(`Unknown command: ${command}`) };
        }
    }
    catch (error) {
        console.error(chalk_1.default.red('Error executing AI prompts tool:'), error);
        return { success: false, error: error };
    }
};
// Export the tool definition
const aiPromptsTools = {
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
exports.default = aiPromptsTools;
