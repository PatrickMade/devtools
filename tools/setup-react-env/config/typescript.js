/**
 * TypeScript Configuration
 * Default configuration for TypeScript in React projects
 */

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

module.exports = tsConfig;
