import { SharedProvidersConstants } from './shared.providers.constants';
import { Provider } from '@angular/core';
import { AuthApiAdapter } from './infra/adapter/http/auth-api.adapter';
import { NgxTranslateAdapter } from './infra/adapter/i18n/ngx-translate.adapter';
import { LocalStorageTokenAdapter } from './infra/adapter/storage/local-storage-token.adapter';
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
	[SharedProvidersConstants.TOKEN_REPOSITORY]: {
		provide: SharedInjectionTokens.TOKEN_REPOSITORY,
		useClass: LocalStorageTokenAdapter,
	},
	[SharedProvidersConstants.AUTH_REPOSITORY]: {
		provide: SharedInjectionTokens.AUTH_REPOSITORY,
		useClass: AuthApiAdapter,
	},
};
