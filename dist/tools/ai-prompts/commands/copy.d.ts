/**
 * Copy Prompt Command
 * Copies a specific prompt to the clipboard
 */
/**
 * Copies a prompt to the clipboard
 * @param promptId - The ID of the prompt to copy
 * @returns Whether the prompt was found and copied
 */
declare const copyPrompt: (promptId: string) => Promise<boolean>;
export default copyPrompt;
