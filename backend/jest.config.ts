import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: 'tsconfig.jest.json'  // Pointing to the specific Jest tsconfig
    }],
  },
  testMatch: ["**/tests/**/*.test.ts"],  // Make sure this matches your test files' location
  rootDir: ".",  // Adjust if your structure requires
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: {
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1"
  }
};

export default config;
