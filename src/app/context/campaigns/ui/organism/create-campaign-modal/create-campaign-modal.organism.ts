import { Component, computed, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AppError } from '../../../../../shared/domain/error/exception';
import { RoundedButtonAtom } from '../../../../../shared/ui/atom/button/rounded-button/rounded-button.atom';
import { ModalOrganism } from '../../../../../shared/ui/organism/modal/modal.organism';
import { CampaignInjectionTokens } from '../../../campaign.injection-tokens';
import { CampaignRepository } from '../../../domain/repository/campaign.repository';

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1900;
const MAX_YEAR = CURRENT_YEAR + 10;
const MIN_NUMBER = 1;
const MAX_NUMBER = 50;

/**
 * This file defines the CreateCampaignModal Organism component.
 * It is responsible for collecting and validating the details of a new
 * campaign, and submitting it to the campaigns API.
 */
@Component({
	selector: 'app-create-campaign-modal-organism',
	templateUrl: './create-campaign-modal.organism.html',
	imports: [ReactiveFormsModule, TranslatePipe, RoundedButtonAtom, ModalOrganism],
})
export class CreateCampaignModalOrganism {
	private readonly formBuilder = inject(FormBuilder);
	private readonly campaignRepository = inject<CampaignRepository>(CampaignInjectionTokens.CAMPAIGN_REPOSITORY);

	public readonly created = output<void>();
	public readonly dismiss = output<void>();

	protected readonly minYear = MIN_YEAR;
	protected readonly maxYear = MAX_YEAR;
	protected readonly minNumber = MIN_NUMBER;
	protected readonly maxNumber = MAX_NUMBER;

	protected readonly form = this.formBuilder.group({
		name: ['', [Validators.required]],
		year: [CURRENT_YEAR, [Validators.required, Validators.min(MIN_YEAR), Validators.max(MAX_YEAR)]],
		number: [null as number | null, [Validators.required, Validators.min(MIN_NUMBER), Validators.max(MAX_NUMBER)]],
		isActive: [false],
		confirm: [false, Validators.requiredTrue],
	});

	protected readonly isSubmitting = signal(false);
	protected readonly submitError = signal<AppError | null>(null);
	protected readonly yearNumberErrorParams = computed(() => {
		const detail = this.submitError()?.errorDetail as { year?: number; number?: number } | undefined;
		return { year: detail?.year ?? 0, number: detail?.number ?? 0 };
	});

	/**
	 * This method is called when the user submits the create-campaign form.
	 * It creates the campaign via the campaigns API.
	 */
	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { name, year, number, isActive } = this.form.getRawValue();
		this.submitError.set(null);
		this.isSubmitting.set(true);

		this.campaignRepository
			.create({
				name: name ?? '',
				year: year ?? CURRENT_YEAR,
				number: number ?? MIN_NUMBER,
				isActive: isActive ?? false,
			})
			.subscribe({
				next: () => {
					this.isSubmitting.set(false);
					this.created.emit();
				},
				error: (error: AppError) => {
					this.isSubmitting.set(false);
					this.submitError.set(error);
				},
			});
	}
}
