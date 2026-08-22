import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClientAdapter } from '../../../../../shared/infra/adapter/http/http-client.adapter';
import { Country } from '../../../domain/country';
import { CountryRepository } from '../../../domain/repository/country.repository';

interface CountryResponse {
	readonly country_code: string;
	readonly country_name: string;
	readonly phone_code: number;
}

/**
 * Adapter for country operations against the countries API.
 */
@Injectable({ providedIn: 'root' })
export class CountryApiAdapter implements CountryRepository {
	private readonly http = inject(HttpClientAdapter);

	getAll(): Observable<Country[]> {
		return this.http
			.get<CountryResponse[]>('/countries/')
			.pipe(map((countries) => countries.map((country) => this.toCountry(country))));
	}

	private toCountry(response: CountryResponse): Country {
		return {
			countryCode: response.country_code,
			countryName: response.country_name,
			phoneCode: response.phone_code,
		};
	}
}
