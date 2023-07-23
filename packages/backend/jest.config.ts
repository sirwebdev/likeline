import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  testMatch: ["__test__/**/*.spec.{ts|js}"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  rootDir: ".",
  roots: [
    "<rootDir>"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
}

export default config;
