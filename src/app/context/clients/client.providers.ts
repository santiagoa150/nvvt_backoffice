import { Provider } from '@angular/core';
import { ClientApiAdapter } from './infra/adapter/http/client-api.adapter';
import { ClientInjectionTokens } from './client.injection-tokens';
import { ClientProvidersConstants } from './client.providers.constants';

/**
 * The ClientProviders object defines providers for client module services.
 */
export const ClientProviders: Record<ClientProvidersConstants, Provider> = {
	[ClientProvidersConstants.CLIENT_REPOSITORY]: {
		provide: ClientInjectionTokens.CLIENT_REPOSITORY,
		useClass: ClientApiAdapter,
	},
};
