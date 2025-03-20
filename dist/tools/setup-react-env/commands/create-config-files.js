"use strict";
/**
 * Create Configuration Files Command
 * Handles creation of project configuration files
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
/**
 * Creates the project configuration files
 * @param options - Configuration options
 * @returns Result of the operation
 */
const createConfigFiles = async (options = {}) => {
    const { outputDir = process.cwd() } = options;
    try {
        // Create .vscode directory if it doesn't exist
        const vscodeDir = path_1.default.join(outputDir, '.vscode');
        if (!fs_1.default.existsSync(vscodeDir)) {
            fs_1.default.mkdirSync(vscodeDir, { recursive: true });
        }
        // Write files
        fs_1.default.writeFileSync(path_1.default.join(outputDir, '.prettierrc'), JSON.stringify(config_1.prettierConfig, null, 2));
        fs_1.default.writeFileSync(path_1.default.join(outputDir, '.eslintrc.js'), config_1.eslintConfig);
        fs_1.default.writeFileSync(path_1.default.join(vscodeDir, 'settings.json'), JSON.stringify(config_1.vscodeSettings, null, 2));
        fs_1.default.writeFileSync(path_1.default.join(outputDir, 'tsconfig.json'), JSON.stringify(config_1.tsConfig, null, 2));
        return { success: true };
    }
    catch (error) {
        console.error(chalk_1.default.red('Error creating configuration files:'), error);
        return { success: false, error: error };
    }
};
exports.default = createConfigFiles;
