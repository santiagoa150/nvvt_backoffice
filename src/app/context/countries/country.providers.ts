import { Provider } from '@angular/core';
import { CountryApiAdapter } from './infra/adapter/http/country-api.adapter';
import { CountryInjectionTokens } from './country.injection-tokens';
import { CountryProvidersConstants } from './country.providers.constants';

/**
 * The CountryProviders object defines providers for country module services.
 */
export const CountryProviders: Record<CountryProvidersConstants, Provider> = {
	[CountryProvidersConstants.COUNTRY_REPOSITORY]: {
		provide: CountryInjectionTokens.COUNTRY_REPOSITORY,
		useClass: CountryApiAdapter,
	},
};
