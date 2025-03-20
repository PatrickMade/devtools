/**
 * Configuration Index
 * Exports all configuration templates
 */

const prettierConfig = require('./prettier');
const eslintConfig = require('./eslint');
const vscodeSettings = require('./vscode');
const tsConfig = require('./typescript');

module.exports = {
  prettierConfig,
  eslintConfig,
  vscodeSettings,
  tsConfig
};
