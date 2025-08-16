import { SharedProvidersConstants } from './shared.providers.constants';
import { Provider } from '@angular/core';
import { NgxTranslateRepository } from './infrastructure/ngx-translate/ngx-translate.repository';
import { SharedInjectionTokens } from './shared.injection-tokens';

/**
 * The SharedProviders object defines providers for shared services.
 * These providers are used to inject dependencies throughout the application.
 */
export const SharedProviders: Record<SharedProvidersConstants, Provider> = {
	[SharedProvidersConstants.TRANSLATE_REPOSITORY]: {
		provide: SharedInjectionTokens.TRANSLATE_REPOSITORY,
		useClass: NgxTranslateRepository,
	},
};
