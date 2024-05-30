module.exports = {
  root: true,
  extends: ["@ouroboros/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'error'
  }
};
