/**
 * React Development Environment Setup Tool
 * This tool sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

/**
 * Creates the project configuration files
 * @param {Object} options - Configuration options
 * @returns {Promise<void>}
 */
const createConfigFiles = async (options = {}) => {
  const { outputDir = process.cwd() } = options;

  // Prettier config
  const prettierConfig = {
    semi: true,
    singleQuote: true,
    jsxBracketSameLine: true,
    tabWidth: 2,
    trailingComma: 'es5',
    printWidth: 100,
    bracketSpacing: true,
    arrowParens: 'avoid',
  };

  // ESLint config
  const eslintConfig = `module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};`;

  // VSCode settings
  const vscodeSettings = {
    'prettier.configPath': '.prettierrc',
    'prettier.enable': true,
    'eslint.lintTask.enable': false,
    'eslint.codeActionsOnSave.mode': 'problems',
    'eslint.format.enable': false,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.formatOnSave': true,
    'typescript.suggest.paths': false,
    'javascript.suggest.paths': false,
    'eslint.workingDirectories': [
      {
        mode: 'auto',
      },
    ],
    'files.exclude': {
      '**/.git': true,
      '**/.DS_Store': true,
      '**/node_modules': true,
      '**/ios/Pods': true,
      '**/android/.gradle': true,
      '**/dist': true,
      '**/build': true,
    },
    'editor.fontLigatures': true,
    'editor.tabSize': 2,
    'editor.insertSpaces': true,
    'editor.wordWrap': 'on',
    'editor.minimap.enabled': false,
    'editor.cursorSmoothCaretAnimation': 'on',
    'editor.cursorBlinking': 'smooth',
    'editor.renderWhitespace': 'selection',
    'editor.guides.indentation': true,
    'editor.bracketPairColorization.enabled': true,
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': 'explicit',
      'source.organizeImports': 'explicit',
    },
    'editor.inlineSuggest.enabled': true,
    'editor.quickSuggestions': {
      other: true,
      comments: true,
      strings: true,
    },
    'editor.suggestOnTriggerCharacters': true,
    'editor.tabCompletion': 'on',
    'editor.wordBasedSuggestions': 'matchingDocuments',
    'editor.accessibilitySupport': 'off',
    'editor.linkedEditing': true,
    'editor.inlayHints.enabled': 'on',
    'editor.stickyScroll.enabled': true,
    'files.autoSave': 'onFocusChange',
    'files.trimTrailingWhitespace': true,
    'files.insertFinalNewline': true,
    'javascript.updateImportsOnFileMove.enabled': 'always',
    'typescript.updateImportsOnFileMove.enabled': 'always',
    'javascript.preferences.renameMatchingJsxTags': true,
    'typescript.preferences.renameMatchingJsxTags': true,
    'javascript.suggest.autoImports': true,
    'typescript.suggest.autoImports': true,
    'javascript.preferences.importModuleSpecifier': 'relative',
    'typescript.preferences.importModuleSpecifier': 'relative',
    'typescript.inlayHints.parameterNames.enabled': 'all',
    'javascript.inlayHints.parameterNames.enabled': 'all',
    'emmet.triggerExpansionOnTab': true,
    'emmet.includeLanguages': {
      javascript: 'javascriptreact',
      javascriptreact: 'html',
      typescript: 'typescriptreact',
    },
    'eslint.enable': true,
    'eslint.validate': ['javascript', 'javascriptreact', 'typescript', 'typescriptreact'],
    'prettier.requireConfig': true,
    'prettier.singleQuote': true,
    'prettier.trailingComma': 'es5',
    'prettier.printWidth': 100,
    'git.enableSmartCommit': true,
    'git.autofetch': true,
    'search.exclude': {
      '**/node_modules': true,
      '**/bower_components': true,
      '**/dist': true,
      '**/coverage': true,
    },
    'github.copilot.enable': {
      '*': true,
    },
  };

  // TypeScript config
  const tsConfig = {
    compilerOptions: {
      target: 'es2017',
      jsx: 'react-jsx',
      module: 'esnext',
      moduleResolution: 'node',
      esModuleInterop: true,
      strict: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      allowSyntheticDefaultImports: true,
      noFallthroughCasesInSwitch: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
    },
    include: ['src'],
  };

  try {
    // Create .vscode directory if it doesn't exist
    const vscodeDir = path.join(outputDir, '.vscode');
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    // Write files
    fs.writeFileSync(path.join(outputDir, '.prettierrc'), JSON.stringify(prettierConfig, null, 2));

    fs.writeFileSync(path.join(outputDir, '.eslintrc.js'), eslintConfig);

    fs.writeFileSync(
      path.join(vscodeDir, 'settings.json'),
      JSON.stringify(vscodeSettings, null, 2)
    );

    fs.writeFileSync(path.join(outputDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

    return { success: true };
  } catch (error) {
    console.error(chalk.red('Error creating configuration files:'), error);
    return { success: false, error };
  }
};

/**
 * Installs required dependencies
 * @param {Object} options - Installation options
 * @returns {Promise<Object>} Result of the installation
 */
const installDependencies = async (options = {}) => {
  const { packageManager = 'yarn', dryRun = false } = options;

  const dependencies = [
    'eslint',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'prettier',
    'eslint-config-prettier',
  ];

  const command =
    packageManager === 'npm'
      ? `npm install --save-dev ${dependencies.join(' ')}`
      : `yarn add --dev ${dependencies.join(' ')}`;

  console.log(chalk.blue(`Installing dependencies with ${packageManager}...`));
  console.log(chalk.gray(command));

  if (dryRun) {
    return { success: true, dryRun: true };
  }

  try {
    execSync(command, { stdio: 'inherit' });
    return { success: true };
  } catch (error) {
    console.error(chalk.red('Error installing dependencies:'), error);
    return { success: false, error };
  }
};

/**
 * Execute the setup React environment tool
 * @param {Object} options - Tool options
 * @returns {Promise<Object>} Tool execution result
 */
const execute = async (options = {}) => {
  console.log(
    chalk.blue.bold('Setting up React/React Native development environment with TypeScript...')
  );

  // Step 1: Install dependencies
  const installResult = await installDependencies(options);
  if (!installResult.success && !installResult.dryRun) {
    return { success: false, stage: 'dependencies', error: installResult.error };
  }

  // Step 2: Create configuration files
  const configResult = await createConfigFiles(options);
  if (!configResult.success) {
    return { success: false, stage: 'configuration', error: configResult.error };
  }

  console.log(chalk.green.bold('✔ Setup complete!'));
  console.log(chalk.blue('The following files were created:'));
  console.log(chalk.green('- .prettierrc'));
  console.log(chalk.green('- .eslintrc.js'));
  console.log(chalk.green('- .vscode/settings.json'));
  console.log(chalk.green('- tsconfig.json'));

  console.log(
    chalk.blue(
      '\nMake sure to install the recommended VSCode extensions for the best development experience.'
    )
  );

  return { success: true };
};

// Export the tool definition
module.exports = {
  id: 'setup-react-env',
  name: 'React Development Environment Setup',
  description:
    'Sets up a complete React/React Native development environment with TypeScript, ESLint, and Prettier',
  execute,
  options: {
    outputDir: {
      description: 'Directory where configuration files will be created',
      default: process.cwd(),
    },
    packageManager: {
      description: 'Package manager to use for installing dependencies',
      default: 'yarn',
      choices: ['yarn', 'npm'],
    },
    dryRun: {
      description: 'Run without actually installing dependencies',
      default: false,
      type: 'boolean',
    },
  },
};
