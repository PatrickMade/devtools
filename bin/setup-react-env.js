#!/usr/bin/env node

/**
 * Shortcut executable for the React Development Environment Setup tool
 */

const pmdt = require('../index');

// Run the tool with command line arguments
pmdt.runTool('setup-react-env').catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
