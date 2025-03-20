#!/usr/bin/env node

/**
 * Setup React Environment CLI
 * Shortcut to run the setup-react-env tool
 */

import pmdt from '../index';

/**
 * Run the setup-react-env tool with command line arguments
 */
const run = async () => {
  try {
    // Extract command line arguments
    const args = process.argv.slice(2);
    const options: Record<string, unknown> = {};

    // Parse simple arguments (--key=value or --flag)
    args.forEach(arg => {
      if (arg.startsWith('--')) {
        const parts = arg.substring(2).split('=');
        const key = parts[0];
        const value = parts.length > 1 ? parts[1] : true;
        options[key] = value;
      }
    });

    // Run the tool
    await pmdt.runTool('setup-react-env', options);
  } catch (error) {
    console.error('Error running setup-react-env:', error);
    process.exit(1);
  }
};

// Run the tool
run();
