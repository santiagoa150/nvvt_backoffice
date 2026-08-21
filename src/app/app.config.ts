import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguagesConstants } from './shared/domain/languages.constants';
import { sessionInterceptor } from './shared/infra/interceptor/session.interceptor';
import { SharedProviders } from './shared/shared.providers';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(withInterceptors([sessionInterceptor])),
		provideTranslateService({
			fallbackLang: LanguagesConstants.ES,
			lang: LanguagesConstants.ES,
			loader: provideTranslateHttpLoader({
				prefix: '/i18n/',
				suffix: '.json',
			}),
		}),
		SharedProviders.TOKEN_REPOSITORY,
		SharedProviders.AUTH_REPOSITORY,
	],
};
