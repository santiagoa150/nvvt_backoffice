import { Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AppError } from '../../../../../shared/domain/error/exception';
import { RoundedButtonAtom } from '../../../../../shared/ui/atom/button/rounded-button/rounded-button.atom';
import { ModalOrganism } from '../../../../../shared/ui/organism/modal/modal.organism';
import { ClientInjectionTokens } from '../../../client.injection-tokens';
import { ClientRepository } from '../../../domain/repository/client.repository';

const MIN_COUNTRY_CODE = 1;
const MAX_COUNTRY_CODE = 998;
const PHONE_NUMBER_PATTERN = /^\d{7,12}$/;

/**
 * Validates that the country code and phone number are either both filled in
 * or both left empty, matching the backend's pairing rule.
 */
function phonePairValidator(control: AbstractControl): ValidationErrors | null {
	const countryCode = control.get('countryPhoneCode')?.value;
	const phoneNumber = control.get('phoneNumber')?.value;
	const hasCountryCode = countryCode !== null && countryCode !== '';
	const hasPhoneNumber = phoneNumber !== null && phoneNumber !== '';

	return hasCountryCode !== hasPhoneNumber ? { phonePairIncomplete: true } : null;
}

/**
 * This file defines the CreateClientModal Organism component.
 * It is responsible for collecting and validating the details of a new
 * client, and submitting it to the clients API.
 */
@Component({
	selector: 'app-create-client-modal-organism',
	templateUrl: './create-client-modal.organism.html',
	imports: [ReactiveFormsModule, TranslatePipe, RoundedButtonAtom, ModalOrganism],
})
export class CreateClientModalOrganism {
	private readonly formBuilder = inject(FormBuilder);
	private readonly clientRepository = inject<ClientRepository>(ClientInjectionTokens.CLIENT_REPOSITORY);

	public readonly created = output<void>();
	public readonly dismiss = output<void>();

	protected readonly minCountryCode = MIN_COUNTRY_CODE;
	protected readonly maxCountryCode = MAX_COUNTRY_CODE;

	protected readonly form = this.formBuilder.group(
		{
			givenNames: ['', [Validators.required]],
			familyNames: [''],
			countryPhoneCode: [
				null as number | null,
				[Validators.min(MIN_COUNTRY_CODE), Validators.max(MAX_COUNTRY_CODE)],
			],
			phoneNumber: ['', [Validators.pattern(PHONE_NUMBER_PATTERN)]],
			confirm: [false, Validators.requiredTrue],
		},
		{ validators: phonePairValidator },
	);

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	/**
	 * This method is called when the user submits the create-client form.
	 * It creates the client via the clients API.
	 */
	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { givenNames, familyNames, countryPhoneCode, phoneNumber } = this.form.getRawValue();
		this.errorMessage.set(null);
		this.isSubmitting.set(true);

		this.clientRepository
			.create({
				givenNames: givenNames ?? '',
				familyNames: familyNames ? familyNames : null,
				countryPhoneCode: countryPhoneCode ?? null,
				phoneNumber: phoneNumber ? phoneNumber : null,
			})
			.subscribe({
				next: () => {
					this.isSubmitting.set(false);
					this.created.emit();
				},
				error: (error: AppError) => {
					this.isSubmitting.set(false);
					this.errorMessage.set(error.message);
				},
			});
	}
}
