/**
 * Clipboard Utilities
 * Functions for interacting with the system clipboard
 */
import { ClipboardResult } from '../../../types';
/**
 * Copy text to clipboard
 * @param text - The text to copy to clipboard
 * @returns Result of the operation
 */
export declare const copyToClipboard: (text: string) => ClipboardResult;
