/**
 * AI Prompts Data
 * This file contains all prompts available in the AI prompts library
 */

import { Prompt } from '../../../types';

const prompts: Prompt[] = [
  {
    id: 'refactor',
    name: 'Code Refactoring',
    category: 'Code Improvement',
    description: 'Refactors code to be more modular, eliminate duplication, and improve clarity',
    prompt: `Refactor the following code.
Split it into modular pieces if appropriate.
Eliminate code duplication.
Focus on readability and maintainability.
Simplify complex logic.
Preserve all functionality.
Explain the key improvements you made.`,
  },
  // Add more prompts here
];

export default prompts;
