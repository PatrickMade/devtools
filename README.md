# Patrick Made's Dev Tools (PMDT)

A collection of development tools and utilities for React and React Native projects, written in TypeScript.

## Quick CLI Reference

```bash
# Setup a React/React Native development environment
pmdt setup-react-env

# Browse AI prompts
pmdt ai-prompts browse

# List all available tools
pmdt list

# Get help
pmdt --help
```

## Installation

### Global Installation (Recommended for CLI usage)

```bash
# Using npm
npm install -g patrick-mades-dev-tools

# Using yarn
yarn global add patrick-mades-dev-tools

# Using pnpm
pnpm add -g patrick-mades-dev-tools
```

After installation, the `pmdt` command will be available globally in your terminal.

### Local Installation (For programmatic usage)

```bash
# Using npm
npm install patrick-mades-dev-tools

# Using yarn
yarn add patrick-mades-dev-tools

# Using pnpm
pnpm add patrick-mades-dev-tools
```

### Using with Node.js Corepack

For projects using [Corepack](https://nodejs.org/api/corepack.html), you can specify PMDT as your packageManager in `package.json`:

```json
{
  "packageManager": "npm@9.0.0"
}
```

This ensures everyone working on the project uses the same package manager version, making the CLI commands consistent across environments.

## Command Line Interface

The package provides a powerful CLI tool that gives you access to all available tools:

```bash
# Basic syntax
pmdt <tool-name> [options]

# Examples:
pmdt setup-react-env --outputDir ./config
pmdt ai-prompts show refactor
pmdt list
```

### Available Commands

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `pmdt list`          | List all available tools          |
| `pmdt help`          | Display help information          |
| `pmdt <tool> --help` | Display help for a specific tool  |
| `pmdt-setup-react`   | Shortcut for setup-react-env tool |

## Available Tools

### React Development Environment Setup

Sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier.

**CLI Usage:**

```bash
# Basic usage
pmdt setup-react-env

# With options
pmdt setup-react-env --outputDir ./config --packageManager npm

# Using the direct shortcut
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
- `--packageManager <yarn|npm|pnpm>` - Package manager to use (default: yarn)
- `--dryRun` - Run without actually installing dependencies

### AI Prompts

A collection of AI prompts for various coding tasks, which can be used with Cursor or other AI coding assistants.

**CLI Usage:**

```bash
# List all available prompts
pmdt ai-prompts list

# Show a specific prompt
pmdt ai-prompts show <prompt-id>

# Copy a prompt to clipboard
pmdt ai-prompts copy <prompt-id>

# Browse prompts interactively
pmdt ai-prompts browse
```

## Using in Your Projects Programmatically

The package is written in TypeScript and includes type definitions. When importing the package in your TypeScript projects, you'll get full type support:

```typescript
import pmdt from 'patrick-mades-dev-tools';

// Run a tool programmatically
await pmdt.runTool('setup-react-env', {
  outputDir: './config',
  packageManager: 'npm',
});

// Get all available tools
const tools = pmdt.getTools();
```

## Common CLI Workflows

### Setting Up a New React Project

```bash
# Create a new React project
npx create-react-app my-app
cd my-app

# Set up TypeScript, ESLint and Prettier
pmdt setup-react-env

# Start development
npm start
```

### Finding and Using AI Prompts

```bash
# Browse available prompts interactively
pmdt ai-prompts browse

# Or list all prompts
pmdt ai-prompts list

# Copy a specific prompt to clipboard
pmdt ai-prompts copy refactor
```

## Extending with New Tools

You can create your own tools by following these steps:

1. Create a new directory in the `src/tools` directory with your tool name (e.g., `src/tools/my-new-tool`)
2. Create an `index.ts` file in your tool directory with this structure:

```typescript
import { ToolDefinition, CommandResult } from '../../types';

interface MyToolOptions {
  option1?: string;
  booleanOption?: boolean;
}

const myNewTool: ToolDefinition = {
  id: 'my-new-tool', // Unique ID for the tool
  name: 'My New Tool', // Display name
  description: 'Description of what your tool does',

  // Options for your tool (optional)
  options: {
    option1: {
      description: 'Description of option1',
      default: 'defaultValue',
    },
    booleanOption: {
      description: 'A boolean flag',
      type: 'boolean',
      default: false,
    },
  },

  // The main function that will be executed
  execute: async (options: MyToolOptions): Promise<CommandResult> => {
    // Your tool implementation
    console.log('Tool executed with options:', options);
    return { success: true };
  },
};

export default myNewTool;
```

All tools are automatically discovered and registered when the package loads.

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/PatrickMade/devtools.git
cd devtools

# Install dependencies
npm install

# Build the project
npm run build

# Test CLI locally
node dist/bin/pmdt.js --help
```

### Scripts

- `npm run build` - Build the TypeScript source files
- `npm run lint` - Run ESLint on the source files
- `npm run lint:fix` - Fix linting issues automatically

## License

MIT

## Author

Patryk Madaj
