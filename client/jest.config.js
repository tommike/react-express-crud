module.exports = {
  verbose: false,
  onlyChanged: true,
  clearMocks: true,
  collectCoverage: false,
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
