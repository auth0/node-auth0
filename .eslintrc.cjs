module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2017: true,
    mocha: true,
  },
  ignorePatterns: ['**/*.mjs', '**/*.js'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 9,
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'promise/catch-or-return': 'off',
    'promise/always-return': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/extensions': ['error', 'always'],
  },
};
