module.exports = {
    plugins: ["node"],
    extends: [
      'eslint:recommended',
      'plugin:eslint-plugin/recommended',
    ],
    rules: {
      'camelcase': 'error',
      'no-const-assign': 'off',
      'no-underscore-dangle': ['error', { 'allow': ['__'] }],
      'class-methods-use-this': 'off', // Optional, turn off if you don't require class methods to use 'this'
      'no-multi-assign': 'off', // Optional, turn off if you allow multiple assignments in a single line
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    },
    ignorePatterns: [
      'node_modules/',  // Ignore the node_modules directory
      'dist/',          // Ignore the dist directory
      'seeders/',
      'postgres/',
      'models/',
      'swagger.js',
      'stack-trace.js'
      // Add more patterns as needed
    ],
    parserOptions: {
      ecmaVersion: 2020, // or a higher version based on your code
      sourceType: "module",
    },
    overrides: [
      {
        files: ['*.js', '*.jsx'],
        rules: {
          'no-underscore-dangle': ['error', { 'allow': ['__'] }]
        }, // Adjust based on your file extensions
        // ... other configurations for JavaScript/JSX files
      },
    ],
    env: {
      node: true,
      es6: true,
    },
    globals: {
      // Define global variables here
      __line: 'readonly',
      __path: 'readonly',
      __stack: 'readonly',

      // Add more global variables as needed
    },
  };
  