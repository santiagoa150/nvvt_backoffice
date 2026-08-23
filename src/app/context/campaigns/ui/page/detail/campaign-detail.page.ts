import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { EmptyProductsMolecule } from '../../../../products/ui/molecule/empty-products/empty-products.molecule';
import { ProductCardMolecule } from '../../../../products/ui/molecule/product-card/product-card.molecule';
import { AppError } from '../../../../../shared/domain/error/exception';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { PriceAtom } from '../../../../../shared/ui/atom/price/price.atom';
import { PageHeaderMolecule } from '../../../../../shared/ui/molecule/page-header/page-header.molecule';
import { ConfirmDialogOrganism } from '../../../../../shared/ui/organism/confirm-dialog/confirm-dialog.organism';
import { CampaignInjectionTokens } from '../../../campaign.injection-tokens';
import { CampaignProviders } from '../../../campaign.providers';
import { Campaign, CampaignWithProducts } from '../../../domain/campaign';
import { CampaignRepository } from '../../../domain/repository/campaign.repository';

/**
 * This file defines the Campaign Detail Page component.
 * It is responsible for displaying a campaign's information along with
 * every product that belongs to it.
 */
@Component({
	selector: 'app-campaign-detail-page',
	templateUrl: './campaign-detail.page.html',
	host: { class: 'flex flex-1 flex-col min-h-0' },
	imports: [
		TranslatePipe,
		IconButtonAtom,
		LoadingSpinnerAtom,
		PageHeaderMolecule,
		ProductCardMolecule,
		EmptyProductsMolecule,
		ConfirmDialogOrganism,
		PriceAtom,
	],
	providers: [CampaignProviders.CAMPAIGN_REPOSITORY],
})
export class CampaignDetailPage {
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);
	private readonly campaignRepository = inject<CampaignRepository>(CampaignInjectionTokens.CAMPAIGN_REPOSITORY);

	private readonly campaignId = this.route.snapshot.paramMap.get('id') ?? '';

	protected readonly campaign = signal<CampaignWithProducts | null>(null);
	protected readonly isLoadingCampaign = signal(true);

	protected readonly summary = computed(() => this.campaign()?.summary ?? null);
	protected readonly products = computed(() => this.campaign()?.products ?? []);
	protected readonly isEmpty = computed(() => !this.isLoadingCampaign() && this.products().length === 0);

	protected readonly singlePaymentProducts = computed(() =>
		this.products().filter((product) => product.installments <= 1),
	);
	protected readonly installmentProducts = computed(() =>
		this.products().filter((product) => product.installments > 1),
	);
	protected readonly isSinglePaymentEmpty = computed(
		() => !this.isLoadingCampaign() && this.singlePaymentProducts().length === 0,
	);
	protected readonly isInstallmentEmpty = computed(
		() => !this.isLoadingCampaign() && this.installmentProducts().length === 0,
	);

	protected readonly pendingDelete = signal<Campaign | null>(null);
	protected readonly isDeleting = signal(false);
	protected readonly deleteError = signal<AppError | null>(null);

	protected readonly isActivating = signal(false);
	protected readonly activateError = signal<AppError | null>(null);

	constructor() {
		this.fetchCampaign();
	}

	/**
	 * This method is called when the user clicks the back button. It returns
	 * them to the campaigns list.
	 */
	protected onBack(): void {
		this.router.navigate(['/campaign/list']);
	}

	/**
	 * This method is called when the user requests to delete this campaign.
	 * It opens the confirmation dialog.
	 */
	protected onDeleteRequested(): void {
		this.deleteError.set(null);
		this.pendingDelete.set(this.campaign());
	}

	/**
	 * This method is called when the user dismisses the delete confirmation
	 * dialog without confirming.
	 */
	protected onDeleteDismissed(): void {
		this.pendingDelete.set(null);
		this.deleteError.set(null);
	}

	/**
	 * This method is called when the user confirms the deletion of this
	 * campaign. It deletes it via the campaigns API and returns to the list.
	 */
	protected onDeleteConfirmed(): void {
		const campaign = this.pendingDelete();
		if (!campaign) {
			return;
		}

		this.isDeleting.set(true);
		this.campaignRepository.delete(campaign.campaignId).subscribe({
			next: () => {
				this.isDeleting.set(false);
				this.router.navigate(['/campaign/list']);
			},
			error: (error: AppError) => {
				this.isDeleting.set(false);
				this.deleteError.set(error);
			},
		});
	}

	/**
	 * This method is called when the user requests to activate this campaign.
	 * It activates it via the campaigns API and refreshes its data.
	 */
	protected onActivateRequested(): void {
		this.activateError.set(null);
		this.isActivating.set(true);
		this.campaignRepository.activate(this.campaignId).subscribe({
			next: () => {
				this.isActivating.set(false);
				this.fetchCampaign();
			},
			error: (error: AppError) => {
				this.isActivating.set(false);
				this.activateError.set(error);
			},
		});
	}

	private fetchCampaign(): void {
		this.isLoadingCampaign.set(true);
		this.campaignRepository.getById(this.campaignId).subscribe({
			next: (campaign) => {
				this.campaign.set(campaign);
				this.isLoadingCampaign.set(false);
			},
			error: () => {
				this.isLoadingCampaign.set(false);
			},
		});
	}
}
