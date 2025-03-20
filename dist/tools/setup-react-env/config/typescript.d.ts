/**
 * TypeScript Configuration
 * Default configuration for TypeScript in React projects
 */
declare const tsConfig: {
    compilerOptions: {
        target: string;
        jsx: string;
        module: string;
        moduleResolution: string;
        esModuleInterop: boolean;
        strict: boolean;
        skipLibCheck: boolean;
        forceConsistentCasingInFileNames: boolean;
        lib: string[];
        allowJs: boolean;
        allowSyntheticDefaultImports: boolean;
        noFallthroughCasesInSwitch: boolean;
        resolveJsonModule: boolean;
        isolatedModules: boolean;
        noEmit: boolean;
    };
    include: string[];
};
export default tsConfig;
