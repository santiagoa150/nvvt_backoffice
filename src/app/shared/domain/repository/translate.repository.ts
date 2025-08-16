import { LanguagesConstants } from '../languages.constants';

/**
 * Repository interface for translation-related operations.
 */
export interface TranslateRepository {
	/**
	 * Changes the current language of the application.
	 * @param lang - The language to switch to, defined in LanguagesConstants.
	 */
	changeLang(lang: LanguagesConstants): void;
}
