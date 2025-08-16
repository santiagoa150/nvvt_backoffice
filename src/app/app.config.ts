import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguagesConstants } from './shared/domain/languages.constants';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		provideTranslateService({
			fallbackLang: LanguagesConstants.ES,
			lang: LanguagesConstants.ES,
			loader: provideTranslateHttpLoader({
				prefix: '/i18n/',
				suffix: '.json',
			}),
		}),
	],
};
