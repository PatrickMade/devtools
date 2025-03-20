/**
 * VSCode Settings
 * Default configuration for VSCode editor
 */
declare const vscodeSettings: {
    'prettier.configPath': string;
    'prettier.enable': boolean;
    'eslint.lintTask.enable': boolean;
    'eslint.codeActionsOnSave.mode': string;
    'eslint.format.enable': boolean;
    'editor.defaultFormatter': string;
    'editor.formatOnSave': boolean;
    'typescript.suggest.paths': boolean;
    'javascript.suggest.paths': boolean;
    'eslint.workingDirectories': {
        mode: string;
    }[];
    'files.exclude': {
        '**/.git': boolean;
        '**/.DS_Store': boolean;
        '**/node_modules': boolean;
        '**/ios/Pods': boolean;
        '**/android/.gradle': boolean;
        '**/dist': boolean;
        '**/build': boolean;
    };
    'editor.fontLigatures': boolean;
    'editor.tabSize': number;
    'editor.insertSpaces': boolean;
    'editor.wordWrap': string;
    'editor.minimap.enabled': boolean;
    'editor.cursorSmoothCaretAnimation': string;
    'editor.cursorBlinking': string;
    'editor.renderWhitespace': string;
    'editor.guides.indentation': boolean;
    'editor.bracketPairColorization.enabled': boolean;
    'editor.codeActionsOnSave': {
        'source.fixAll.eslint': string;
        'source.organizeImports': string;
    };
    'editor.inlineSuggest.enabled': boolean;
    'editor.quickSuggestions': {
        other: boolean;
        comments: boolean;
        strings: boolean;
    };
    'editor.suggestOnTriggerCharacters': boolean;
    'editor.tabCompletion': string;
    'editor.wordBasedSuggestions': string;
    'editor.accessibilitySupport': string;
    'editor.linkedEditing': boolean;
    'editor.inlayHints.enabled': string;
    'editor.stickyScroll.enabled': boolean;
    'files.autoSave': string;
    'files.trimTrailingWhitespace': boolean;
    'files.insertFinalNewline': boolean;
    'javascript.updateImportsOnFileMove.enabled': string;
    'typescript.updateImportsOnFileMove.enabled': string;
    'javascript.preferences.renameMatchingJsxTags': boolean;
    'typescript.preferences.renameMatchingJsxTags': boolean;
    'javascript.suggest.autoImports': boolean;
    'typescript.suggest.autoImports': boolean;
    'javascript.preferences.importModuleSpecifier': string;
    'typescript.preferences.importModuleSpecifier': string;
    'typescript.inlayHints.parameterNames.enabled': string;
    'javascript.inlayHints.parameterNames.enabled': string;
    'emmet.triggerExpansionOnTab': boolean;
    'emmet.includeLanguages': {
        javascript: string;
        javascriptreact: string;
        typescript: string;
    };
    'eslint.enable': boolean;
    'eslint.validate': string[];
    'prettier.requireConfig': boolean;
    'prettier.singleQuote': boolean;
    'prettier.trailingComma': string;
    'prettier.printWidth': number;
    'git.enableSmartCommit': boolean;
    'git.autofetch': boolean;
    'search.exclude': {
        '**/node_modules': boolean;
        '**/bower_components': boolean;
        '**/dist': boolean;
        '**/coverage': boolean;
    };
};
export default vscodeSettings;
