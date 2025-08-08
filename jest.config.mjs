/** @type {import('jest').Config} */
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    projects: [
        {
            displayName: "unit",
            preset: "ts-jest",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\.{1,2}/.*)\.js$": "$1",
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
                "^(\.{1,2}/.*)\.js$": "$1",
            },
            roots: ["<rootDir>/src/management/tests"],
            testMatch: ["<rootDir>/tests/unit/**/?(*.)+(browser).(spec|test).[jt]s?(x)"],
            setupFilesAfterEnv: [],
        },
        ,
        {
            displayName: "wire",
            preset: "ts-jest",
            testEnvironment: "node",
            moduleNameMapper: {
                "^(\.{1,2}/.*)\.js$": "$1",
            },
            roots: ["<rootDir>/src/management/tests/wire"],
            setupFilesAfterEnv: ["<rootDir>/src/management/tests/mock-server/setup.ts"],
        },
    ],
    workerThreads: false,
    passWithNoTests: true,
};
