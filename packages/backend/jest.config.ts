import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: true,
  clearMocks: true,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  rootDir: ".",
  roots: [
    "<rootDir>"
  ],
  globalSetup: './src/__test__/setup.ts',
  globalTeardown: "./src/__test__/teardown.ts",
  setupFilesAfterEnv: ["<rootDir>/src/__test__/setup-after-env.ts"],
  watchPathIgnorePatterns: ["<rootDir>/src/uploads", "<rootDir>/src/temp"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "./infrastructures/middlewares"
  ],
}

export default config;
