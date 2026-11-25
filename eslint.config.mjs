import js from '@eslint/js';
import * as wdio from 'eslint-plugin-wdio';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'reports/'],
  },

  js.configs.recommended,
  wdio.configs['flat/recommended'],

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        chaiExpect: 'readonly',
        chaiAssert: 'readonly',
        chaiShould: 'readonly',
        assert: 'readonly',
      },
    },

    rules: {
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
    },
  },
  
  {
    files: ['specs/**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },

  {
    files: ['features/step-definitions/**/*.js'],
    languageOptions: {
      globals: {
        Given: 'readonly',
        When: 'readonly',
        Then: 'readonly',
      },
    },
  },

  eslintConfigPrettier,
];
