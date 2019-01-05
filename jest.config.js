module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.js?(x)', '<rootDir>/src/**/?(*.)+(spec|test).js?(x)'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/helpers/empty-module.js',
    '\\.png$': '<rootDir>/test/helpers/empty-module.js',
    '\\.jpg$': '<rootDir>/test/helpers/empty-module.js',
    '\\.css$': '<rootDir>/test/helpers/empty-module.js',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
