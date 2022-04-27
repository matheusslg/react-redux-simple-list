const config = {
  rootDir: 'src',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
};

module.exports = config;
