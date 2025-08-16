import { SharedProvidersConstants } from './shared.providers.constants';
import { InjectionToken } from '@angular/core';

/**
 * The SharedInjectionTokens object defines injection tokens for shared services.
 * These tokens are used to inject dependencies throughout the application.
 */
export const SharedInjectionTokens: Record<SharedProvidersConstants, InjectionToken<unknown>> = {
	[SharedProvidersConstants.TRANSLATE_REPOSITORY]: new InjectionToken<unknown>(
		SharedProvidersConstants.TRANSLATE_REPOSITORY,
	),
};
