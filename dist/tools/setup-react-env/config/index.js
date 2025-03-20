"use strict";
/**
 * Configuration Index
 * Exports all configuration templates
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscodeSettings = exports.tsConfig = exports.prettierConfig = exports.eslintConfig = void 0;
const eslint_1 = __importDefault(require("./eslint"));
exports.eslintConfig = eslint_1.default;
const prettier_1 = __importDefault(require("./prettier"));
exports.prettierConfig = prettier_1.default;
const typescript_1 = __importDefault(require("./typescript"));
exports.tsConfig = typescript_1.default;
const vscode_1 = __importDefault(require("./vscode"));
exports.vscodeSettings = vscode_1.default;
