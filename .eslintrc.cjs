module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  ignorePatterns: ['dist/*', 'build/*', 'vite.config.ts', 'capacitor.config.ts', 'electron/*'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'no-param-reassign': 'off',
    'max-len': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
