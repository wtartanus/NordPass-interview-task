import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  setupFiles: [
    "<rootDir>/src/__mocks__/setEnvVars.ts"
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    "\\.(css|scss)$": 'identity-obj-proxy'
  },
};

export default config;
