import { Component, computed, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CountryInjectionTokens } from '../../../../context/countries/country.injection-tokens';
import { CountryProviders } from '../../../../context/countries/country.providers';
import { Country } from '../../../../context/countries/domain/country';
import { CountryRepository } from '../../../../context/countries/domain/repository/country.repository';

/**
 * This file defines the CountrySelect Molecule component.
 * It is a reactive-forms control that lets the user pick a country by its flag
 * and phone dialing code, and exposes the selected phone code as its form value.
 */
@Component({
	selector: 'app-country-select-molecule',
	templateUrl: './country-select.molecule.html',
	imports: [TranslatePipe],
	providers: [
		CountryProviders.COUNTRY_REPOSITORY,
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CountrySelectMolecule),
			multi: true,
		},
	],
})
export class CountrySelectMolecule implements ControlValueAccessor {
	private readonly countryRepository = inject<CountryRepository>(CountryInjectionTokens.COUNTRY_REPOSITORY);

	private onChange: (value: number | null) => void = () => undefined;
	private onTouched: () => void = () => undefined;

	protected readonly countries = signal<Country[]>([]);
	protected readonly search = signal('');
	protected readonly isOpen = signal(false);
	protected readonly isDisabled = signal(false);
	protected readonly selectedPhoneCode = signal<number | null>(null);

	protected readonly selectedCountry = computed(() => {
		const phoneCode = this.selectedPhoneCode();
		if (phoneCode === null) {
			return null;
		}
		return this.countries().find((country) => country.phoneCode === phoneCode) ?? null;
	});

	protected readonly filteredCountries = computed(() => {
		const term = this.search().trim().toUpperCase();
		if (!term) {
			return this.countries();
		}
		return this.countries().filter(
			(country) => country.countryName.includes(term) || `+${country.phoneCode}`.includes(term),
		);
	});

	constructor() {
		this.countryRepository.getAll().subscribe((countries) => this.countries.set(countries));
	}

	writeValue(value: number | null): void {
		this.selectedPhoneCode.set(value);
	}

	registerOnChange(fn: (value: number | null) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	protected flagUrl(countryCode: string): string {
		return `https://flagfeed.com/country/${countryCode.toLowerCase()}`;
	}

	protected toggle(): void {
		if (this.isDisabled()) {
			return;
		}
		this.isOpen.update((isOpen) => !isOpen);
	}

	protected close(): void {
		this.isOpen.set(false);
		this.search.set('');
		this.onTouched();
	}

	protected onSearchInput(value: string): void {
		this.search.set(value);
	}

	protected select(country: Country): void {
		this.selectedPhoneCode.set(country.phoneCode);
		this.onChange(country.phoneCode);
		this.close();
	}
}
