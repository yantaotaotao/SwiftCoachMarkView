import type { Config } from 'jest';

const config: Config = {
  rootDir: '../../',
  testMatch: ['<rootDir>/tests/backend/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  setupFilesAfterSetup: ['<rootDir>/tests/backend/setup.ts'],
  coverageDirectory: '<rootDir>/coverage/backend',
  collectCoverageFrom: [
    '<rootDir>/backend/src/**/*.ts',
    '!<rootDir>/backend/src/main.ts',
    '!<rootDir>/backend/src/**/*.module.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/backend/src/$1',
  },
  testTimeout: 30000,
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
};

export default config;