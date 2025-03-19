# Patrick Made's Dev Tools

A collection of development tools and utilities for React and React Native projects.

## Installation

```bash
# Using npm
npm install -g patrick-mades-dev-tools

# Using yarn
yarn global add patrick-mades-dev-tools
```

## Available Tools

### React Development Environment Setup

Sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier.

**Usage:**

```bash
# Using the CLI
pmdt setup-react-env

# Or using the direct shortcut
pmdt-setup-react
```

This tool will:

1. Install essential dependencies:
   - ESLint with React and TypeScript plugins
   - Prettier and its ESLint integration

2. Create configuration files:
   - `.prettierrc` - Prettier configuration
   - `.eslintrc.js` - ESLint configuration for React/TypeScript
   - `.vscode/settings.json` - Optimized VSCode settings
   - `tsconfig.json` - TypeScript configuration for React

**Options:**

- `--outputDir <path>` - Directory where configuration files will be created (default: current directory)
- `--packageManager <yarn|npm>` - Package manager to use (default: yarn)
- `--dryRun` - Run without actually installing dependencies

## Command Line Interface

The package provides a CLI tool that gives you access to all available tools:

```bash
# List all available tools
pmdt list

# Get help for a specific tool
pmdt setup-react-env --help

# Get general help
pmdt --help
```

## Extending with New Tools

You can create your own tools by following these steps:

1. Create a new directory in the `tools` directory with your tool name (e.g., `tools/my-new-tool`)
2. Create an `index.js` file in your tool directory with this structure:

```javascript
module.exports = {
  id: 'my-new-tool', // Unique ID for the tool
  name: 'My New Tool', // Display name
  description: 'Description of what your tool does',

  // Options for your tool (optional)
  options: {
    option1: {
      description: 'Description of option1',
      default: 'defaultValue'
    },
    booleanOption: {
      description: 'A boolean flag',
      type: 'boolean',
      default: false
    }
  },

  // The main function that will be executed
  execute: async (options) => {
    // Your tool implementation
    console.log('Tool executed with options:', options);
    return { success: true };
  }
};
```

All tools are automatically discovered and registered when the package loads.

## License

MIT

## Author

Patryk Madaj
