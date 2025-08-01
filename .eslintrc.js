module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 2,
    'no-param-reassign': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'react/prop-types': 0,
    '@typescript-eslint/no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'import/no-named-as-default': 0,
    'consistent-return': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 'error', // 檢查 Hook 的規則
    'react-hooks/exhaustive-deps': 'warn', // 檢查 effect 的相依性
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-expression'],
        unnamedComponents: ['arrow-function', 'function-expression'],
      },
    ],
    'react/require-default-props': 0, // Since we do not use prop-types
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
