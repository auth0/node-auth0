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
            lines: 80,
            statements: 80,
        },
    },
    projects: [
        {
            displayName: "unit",
            preset: "ts-jest",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\\.{1,2}/.*)\\.js$": "$1",
            },
            roots: ["<rootDir>/src/management/tests"],
            testPathIgnorePatterns: ["\.browser\.(spec|test)\.[jt]sx?$", "/tests/wire/"],
            setupFilesAfterEnv: [],
        },
        {
            displayName: "browser",
            preset: "ts-jest",
            testEnvironment: "<rootDir>/src/management/tests/BrowserTestEnvironment.ts",
            moduleNameMapper: {
                "^(\\.{1,2}/.*)\\.js$": "$1",
            },
            roots: ["<rootDir>/src/management/tests"],
            testMatch: ["<rootDir>/src/management/tests/unit/**/?(*.)+(browser).(spec|test).[jt]s?(x)"],
            setupFilesAfterEnv: [],
        },
        {
            displayName: "wire",
            preset: "ts-jest",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\\.{1,2}/.*)\\.js$": "$1",
            },
            roots: ["<rootDir>/src/management/tests/wire"],
            setupFilesAfterEnv: ["<rootDir>/src/management/tests/mock-server/setup.ts"],
        },
        {
            displayName: "root-tests",
            preset: "ts-jest/presets/default-esm",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\\.{1,2}/.*)\\.js$": "$1",
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
