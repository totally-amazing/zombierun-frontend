module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '**/*.jsx',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
};
