module.exports = {
  root: true,
  extends: ["@ouroboros/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'error'
  }
};
