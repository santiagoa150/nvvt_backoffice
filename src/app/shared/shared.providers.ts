import { SharedProvidersConstants } from './shared.providers.constants';
import { Provider } from '@angular/core';
import { NgxTranslateAdapter } from './infra/adapter/i18n/ngx-translate.adapter';
import { SharedInjectionTokens } from './shared.injection-tokens';

/**
 * The SharedProviders object defines providers for shared services.
 * These providers are used to inject dependencies throughout the application.
 */
export const SharedProviders: Record<SharedProvidersConstants, Provider> = {
	[SharedProvidersConstants.TRANSLATE_REPOSITORY]: {
		provide: SharedInjectionTokens.TRANSLATE_REPOSITORY,
		useClass: NgxTranslateAdapter,
	},
};
