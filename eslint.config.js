// @ts-check
const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettier = require('eslint-plugin-prettier/recommended');

module.exports = tsEslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'arrow-body-style': 'off',
      'linebreak-style': 'off',
      'max-depth': ['error', 4],
      'object-curly-spacing': ['error', 'always'],
      'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
      'prefer-template': ['error'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
