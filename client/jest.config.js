module.exports = {
  "preset": "jest-puppeteer",
  verbose: false,
  onlyChanged: true,
  clearMocks: true,
  collectCoverage: false,
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
