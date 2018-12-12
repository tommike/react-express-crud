module.exports = {
  verbose: false,
  bail: true,
  onlyChanged: true,
  clearMocks: true,
  collectCoverage: false,
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  testRegex: './__tests__/.*.js$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
