import { InjectionToken } from '@angular/core';
import { CountryProvidersConstants } from './country.providers.constants';

/**
 * The CountryInjectionTokens object defines injection tokens for country module services.
 */
export const CountryInjectionTokens: Record<CountryProvidersConstants, InjectionToken<unknown>> = {
	[CountryProvidersConstants.COUNTRY_REPOSITORY]: new InjectionToken<unknown>(
		CountryProvidersConstants.COUNTRY_REPOSITORY,
	),
};
