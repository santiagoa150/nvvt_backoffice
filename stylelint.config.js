// @ts-check

/** @type {import('stylelint').Config} */
module.exports = {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'alpha-value-notation': 'number',
		'at-rule-empty-line-before': 'always',
		'at-rule-no-unknown': null,
		'block-no-empty': true,
		'color-hex-length': 'long',
		'color-no-invalid-hex': true,
		'comment-whitespace-inside': 'always',
		'font-family-name-quotes': 'always-where-recommended',
		'function-name-case': 'lower',
		'function-url-quotes': 'always',
		'import-notation': 'url',
		'length-zero-no-unit': true,
		'lightness-notation': 'number',
		'max-nesting-depth': 3,
		'media-query-no-invalid': true,
		'no-descending-specificity': true,
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'property-no-unknown': true,
		'scss/at-rule-no-unknown': true,
		'selector-pseudo-element-colon-notation': 'single',
		'selector-type-case': 'lower',
		'shorthand-property-no-redundant-values': true,
		'unit-no-unknown': true,
		'value-keyword-case': 'lower',
	},
};
