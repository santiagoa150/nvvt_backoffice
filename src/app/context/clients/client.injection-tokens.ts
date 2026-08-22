import { InjectionToken } from '@angular/core';
import { ClientProvidersConstants } from './client.providers.constants';

/**
 * The ClientInjectionTokens object defines injection tokens for client module services.
 */
export const ClientInjectionTokens: Record<ClientProvidersConstants, InjectionToken<unknown>> = {
	[ClientProvidersConstants.CLIENT_REPOSITORY]: new InjectionToken<unknown>(
		ClientProvidersConstants.CLIENT_REPOSITORY,
	),
};
