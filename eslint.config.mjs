// @ts-check
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tsEslint.config(
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
		files: ['**/*.js'],
		extends: [eslint.configs.recommended, eslintPluginPrettier],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},
		rules: {
			'arrow-body-style': 'off',
			'linebreak-style': 'off',
			'max-depth': ['error', 4],
			'object-curly-spacing': ['error', 'always'],
			'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
			'prefer-template': ['error'],
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {},
	},
);
