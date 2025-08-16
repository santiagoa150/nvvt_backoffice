import { TranslateRepository } from '../../domain/repository/translate.repository';
import { LanguagesConstants } from '../../domain/languages.constants';
import { TranslateService } from '@ngx-translate/core';
import { inject, Injectable } from '@angular/core';

/**
 * Repository implementation for translation-related operations using ngx-translate.
 */
@Injectable({ providedIn: 'root' })
export class NgxTranslateRepository implements TranslateRepository {
	private readonly service = inject(TranslateService);

	/**
	 * Changes the current language of the application.
	 */
	changeLang(lang: LanguagesConstants): void {
		this.service.use(lang);
	}
}
