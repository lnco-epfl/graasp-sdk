module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transformIgnorePatterns: ['/node_modules/(?!@graasp/sdk)'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  // added for jest to look for the dependencies
  modulePaths: ['src/'],
  setupFiles: ['./test/setupTests.ts'],
};
