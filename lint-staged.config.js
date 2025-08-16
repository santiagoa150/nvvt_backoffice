/** @type {import('lint-staged').Config} */
module.exports = {
	'**/*.{ts,js}': ['eslint --fix', 'prettier --write'],
	'**/*.{scss,css}': ['stylelint --fix'],
	'public/i18n/*.json': ['npm run validate:18n'],
	'eslint.config.mjs': () => {
		return ['eslint "src/**/*.{ts,js}" --fix', 'prettier --write .'];
	},
	'stylelint.config.js': () => {
		return ['npm run lint:styles'];
	},
};
