/** @type {import('jest').Config} */
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: false, // Disabled by default, enabled via --coverage flag
    collectCoverageFrom: [
        "src/**/*.{ts,js}",
        "!src/**/*.d.ts",
        "!src/**/*.test.ts",
        "!src/**/*.spec.ts",
        "!src/**/tests/**",
        "!src/**/__tests__/**",
        "!src/**/__mocks__/**",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html", "json"],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 90,
            lines: 75,
            statements: 75,
        },
    },
    projects: [
        {
            displayName: "unit",
            preset: "ts-jest",
            testEnvironment: "node",
            roots: ["<rootDir>/src/management/tests"],
            testPathIgnorePatterns: ["/tests/wire/"],
            // Use lightweight CJS stub to avoid ESM openid-client dependency.
            // The real @auth0/auth0-auth-js dist/index.cjs requires ESM openid-client,
            // which Jest's CJS runtime cannot load. token-provider.test.ts uses its own
            // jest.mock() and fully covers token-acquisition behavior.
            moduleNameMapper: {
                "^(\.{1,2}/.*)\.js$": "$1",
                "^@auth0/auth0-auth-js$": "<rootDir>/src/management/tests/__mocks__/auth0-auth-js.cjs",
            },
            setupFilesAfterEnv: ["<rootDir>/src/management/tests/setup.ts"],
            transform: {
                "^.+\\.tsx?$": [
                    "ts-jest",
                    {
                        tsconfig: "<rootDir>/src/management/tests/tsconfig.json",
                    },
                ],
            },
        },
        {
            displayName: "wire",
            preset: "ts-jest",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\.{1,2}/.*)\.js$": "$1",
                "^@auth0/auth0-auth-js$": "<rootDir>/src/management/tests/__mocks__/auth0-auth-js.cjs",
            },
            roots: ["<rootDir>/src/management/tests/wire"],
            setupFilesAfterEnv: [
                "<rootDir>/src/management/tests/setup.ts",
                "<rootDir>/src/management/tests/mock-server/setup.ts",
            ],
            transform: {
                "^.+\\.tsx?$": [
                    "ts-jest",
                    {
                        tsconfig: "<rootDir>/src/management/tests/tsconfig.json",
                    },
                ],
            },
        },
        {
            displayName: "root-tests",
            preset: "ts-jest/presets/default-esm",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\\.{1,2}/.*)\\.js$": "$1",
                // Use CJS stub to avoid ESM openid-client dependency in export-surface test
                "^@auth0/auth0-auth-js$": "<rootDir>/src/management/tests/__mocks__/auth0-auth-js.cjs",
            },
            extensionsToTreatAsEsm: [".ts"],
            transform: {
                "^.+\\.tsx?$": [
                    "ts-jest",
                    {
                        useESM: true,
                    },
                ],
            },
            transformIgnorePatterns: [
                "node_modules/(?!(node-fetch|jose/dist|@auth0|@noble|p-queue|p-timeout|eventemitter3|uuid)/)",
            ],
            roots: ["<rootDir>/tests"],
            setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
        },
    ],
    workerThreads: false,
    passWithNoTests: true,
};
