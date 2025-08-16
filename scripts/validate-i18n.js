#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '../public/i18n');

/** Translation files loaded */
const files = fs.readdirSync(i18nDir).filter((f) => f.endsWith('.json'));

/** Validate that at least one i18n file exists */
if (files.length === 0) {
	console.error('❌ No internationalization files found in', i18nDir);
	process.exit(1);
}

/** @type {string[] | null} */
let referenceKeys = null;
let hasErrors = false;

/**
 * Validates the structure of i18n files and checks for missing keys.
 * @param {Record<string, unknown>} obj - The object to validate
 * @param {string} file - The name of the file being validated
 * @param {string} [prefix] - The prefix for nested keys
 * @returns {string[]} - An array of flattened keys
 */
function flattenKeys(obj, file, prefix = '') {
	return Object.entries(obj).flatMap(([key, value]) => {
		const newKey = prefix ? `${prefix}.${key}` : key;

		/** Data types validations */
		if (typeof value === 'object' && value !== null) {
			if (Array.isArray(value)) {
				console.error(`❌ Invalid value (array) at key: ${newKey} (${file})`);
				hasErrors = true;
			} else {
				return flattenKeys(value, newKey);
			}
		} else if (typeof value !== 'string') {
			console.error(`❌ Non-string value at key: ${newKey} (${file})`);
			hasErrors = true;
		}
		return [newKey];
	});
}

files.forEach((file) => {
	/** Specific translation file is loaded */
	const filePath = path.join(i18nDir, file);
	const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	const fileKeys = flattenKeys(content, file);

	if (!referenceKeys) {
		/** Initialize reference keys with the first file's keys */
		console.log(`⚠️ Using ${file} as reference for key validation`);
		referenceKeys = fileKeys;
	} else {
		/** Compare keys with the reference file */
		const missing = referenceKeys.filter((k) => !fileKeys.includes(k));
		const extra = fileKeys.filter((k) => !referenceKeys.includes(k));

		if (missing.length) {
			console.error(`❌ Missing keys in ${file}: ${missing.join(', ')}`);
			hasErrors = true;
		}
		if (extra.length) {
			console.error(`❌ Extra keys in ${file}: ${extra.join(', ')}`);
			hasErrors = true;
		}
	}
});

if (hasErrors) {
	console.error('❌ i18n validation failed');
	process.exit(1);
} else {
	console.log('✅ i18n files validated successfully');
}
