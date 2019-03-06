module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).{js,jsx,mjs}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  setupFiles: ['<rootDir>/jest.init.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}']
}
