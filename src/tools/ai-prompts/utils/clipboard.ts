/**
 * Clipboard Utilities
 * Functions for interacting with the system clipboard
 */

import { execSync } from 'child_process';
import { ClipboardResult } from '../../../types';

/**
 * Copy text to clipboard
 * @param text - The text to copy to clipboard
 * @returns Result of the operation
 */
export const copyToClipboard = (text: string): ClipboardResult => {
  try {
    // Try to copy to clipboard using different methods based on platform
    let success = false;

    if (process.platform === 'darwin') {
      // macOS
      execSync(`echo "${text.replace(/"/g, '\\"')}" | pbcopy`);
      success = true;
    } else if (process.platform === 'win32') {
      // Windows
      execSync(`echo ${text.replace(/"/g, '\\"')} | clip`);
      success = true;
    } else if (process.platform === 'linux') {
      // Linux, try xclip first, then xsel
      try {
        execSync(`echo "${text.replace(/"/g, '\\"')}" | xclip -selection clipboard`);
        success = true;
      } catch (e) {
        try {
          execSync(`echo "${text.replace(/"/g, '\\"')}" | xsel -ib`);
          success = true;
        } catch (e) {
          // Both failed, will fall back to just displaying the text
        }
      }
    }

    return {
      success,
      message: success ? 'Copied to clipboard successfully' : 'Could not copy to clipboard',
    };
  } catch (error) {
    return {
      success: false,
      error: error as Error,
      message: 'Error copying to clipboard',
    };
  }
};
