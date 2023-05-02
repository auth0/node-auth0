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
    'plugin:jsdoc/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jsdoc', '@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 9,
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsdoc/require-jsdoc': ['warn', { publicOnly: true }],
    'jsdoc/require-returns-description': 'off',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/check-param-names': 'off',

    'promise/catch-or-return': 'off',
    'promise/always-return': 'off',
    'import/no-default-export': 'error',
  },
};
