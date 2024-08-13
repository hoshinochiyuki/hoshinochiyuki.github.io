import js from '@eslint/js';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        tabWidth: 4,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100
      }
    ],
    camelcase: 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': [
      'off',
      {
        properties: 'always'
      }
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'off',
      {
        functions: true,
        classes: true
      }
    ],
    'no-unused-vars': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-non-null-assertion': ['error'],
    'i18n/no-chinese-character': 'error',
    'i18n/no-japanese-character': 'error',
    'one-var': ['error', { const: 'never' }],
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description'
      }
    ],
    'no-duplicate-imports': 'error',
    'react/react-in-jsx-scope': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    },
    {
      files: [
        '*.{test,stories}.tsx',
        'ja.ts',
        'en.ts',
        '*.less',
        'timezone.js',
        '!e2e/*'
      ],
      rules: {
        'i18n/no-chinese-character': 'off',
        'i18n/no-japanese-character': 'off'
      }
    }
  ]
});
