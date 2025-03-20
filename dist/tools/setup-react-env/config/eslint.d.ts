/**
 * ESLint Configuration
 * Default configuration for ESLint
 */
declare const eslintConfig = "module.exports = {\n  env: {\n    es6: true,\n    node: true,\n    browser: true,\n  },\n  parser: '@typescript-eslint/parser',\n  parserOptions: {\n    ecmaVersion: 2021,\n    sourceType: 'module',\n    ecmaFeatures: {\n      jsx: true,\n    },\n  },\n  extends: [\n    'eslint:recommended',\n    'plugin:react/recommended',\n    'plugin:react-hooks/recommended',\n    'plugin:@typescript-eslint/recommended',\n    'prettier',\n  ],\n  rules: {\n    'linebreak-style': ['error', 'unix'],\n    semi: ['error', 'always'],\n    'arrow-body-style': ['error', 'as-needed'],\n    'react-hooks/rules-of-hooks': 'error',\n    'react-hooks/exhaustive-deps': 'warn',\n    'react/display-name': 'off',\n    'react/react-in-jsx-scope': 'off',\n    'react/prop-types': 'off',\n  },\n  plugins: ['react', 'react-hooks', '@typescript-eslint'],\n  settings: {\n    react: {\n      version: 'detect',\n    },\n  },\n};";
export default eslintConfig;
