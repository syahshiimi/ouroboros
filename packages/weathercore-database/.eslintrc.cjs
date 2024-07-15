const { builtinModules } = require('module');

const ALLOWED_NODE_BUILTINS = new Set(['assert']);

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: ["@ouroboros/eslint-config/library.js"],
  rules: {
   // recommended for safety
   '@typescript-eslint/no-floating-promises': 'error',
   // relaxed rules, for convenience
   '@typescript-eslint/no-unused-vars': [
     'warn',
     {
       argsIgnorePattern: '^_',
       varsIgnorePattern: '^_',
     },
   ],
   '@typescript-eslint/no-explicit-any': 'off',
  },
  ignorePatterns: ["__tests__/*"],
};
