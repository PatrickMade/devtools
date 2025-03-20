"use strict";
/**
 * Clipboard Utilities
 * Functions for interacting with the system clipboard
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToClipboard = void 0;
const child_process_1 = require("child_process");
/**
 * Copy text to clipboard
 * @param text - The text to copy to clipboard
 * @returns Result of the operation
 */
const copyToClipboard = (text) => {
    try {
        // Try to copy to clipboard using different methods based on platform
        let success = false;
        if (process.platform === 'darwin') {
            // macOS
            (0, child_process_1.execSync)(`echo "${text.replace(/"/g, '\\"')}" | pbcopy`);
            success = true;
        }
        else if (process.platform === 'win32') {
            // Windows
            (0, child_process_1.execSync)(`echo ${text.replace(/"/g, '\\"')} | clip`);
            success = true;
        }
        else if (process.platform === 'linux') {
            // Linux, try xclip first, then xsel
            try {
                (0, child_process_1.execSync)(`echo "${text.replace(/"/g, '\\"')}" | xclip -selection clipboard`);
                success = true;
            }
            catch (e) {
                try {
                    (0, child_process_1.execSync)(`echo "${text.replace(/"/g, '\\"')}" | xsel -ib`);
                    success = true;
                }
                catch (e) {
                    // Both failed, will fall back to just displaying the text
                }
            }
        }
        return {
            success,
            message: success ? 'Copied to clipboard successfully' : 'Could not copy to clipboard',
        };
    }
    catch (error) {
        return {
            success: false,
            error: error,
            message: 'Error copying to clipboard',
        };
    }
};
exports.copyToClipboard = copyToClipboard;
