module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    tsconfigRootDir: 'D:/Projects/giftsMadeEasy/cloud_functions/functions/'
  },
  ignorePatterns: [
    '/lib/**/*' // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'quote-props': ['off'],
    'import/no-unresolved': 0,
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['off'],
    indent: ['off']
  }
};
