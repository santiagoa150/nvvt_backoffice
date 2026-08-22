import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RoundedButtonAtom } from '../../../../../shared/ui/atom/button/rounded-button/rounded-button.atom';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { PageHeaderMolecule } from '../../../../../shared/ui/molecule/page-header/page-header.molecule';
import { PaginatorOrganism } from '../../../../../shared/ui/organism/paginator/paginator.organism';
import { CampaignInjectionTokens } from '../../../campaign.injection-tokens';
import { CampaignProviders } from '../../../campaign.providers';
import { Campaign } from '../../../domain/campaign';
import { CampaignRepository } from '../../../domain/repository/campaign.repository';
import { CampaignCardMolecule } from '../../molecule/campaign-card/campaign-card.molecule';
import { CampaignTableMolecule } from '../../molecule/campaign-table/campaign-table.molecule';

const PAGE_SIZE = 10;

/**
 * This file defines the Campaign List Page component.
 * It is responsible for fetching and displaying a paginated list of campaigns.
 */
@Component({
	selector: 'app-campaign-list-page',
	templateUrl: './campaign-list.page.html',
	host: { class: 'flex flex-1 flex-col min-h-0' },
	imports: [
		TranslatePipe,
		RoundedButtonAtom,
		LoadingSpinnerAtom,
		PageHeaderMolecule,
		PaginatorOrganism,
		CampaignTableMolecule,
		CampaignCardMolecule,
	],
	providers: [CampaignProviders.CAMPAIGN_REPOSITORY],
})
export class CampaignListPage {
	private readonly campaignRepository = inject<CampaignRepository>(CampaignInjectionTokens.CAMPAIGN_REPOSITORY);

	protected readonly pageSize = PAGE_SIZE;
	protected readonly campaigns = signal<Campaign[]>([]);
	protected readonly page = signal(1);
	protected readonly totalPages = signal(1);
	protected readonly isLoading = signal(true);

	constructor() {
		this.fetchCampaigns(this.page());
	}

	/**
	 * This method is called when the user navigates to a different page.
	 * @param page - The page number to load.
	 */
	protected onPageChange(page: number): void {
		this.page.set(page);
		this.fetchCampaigns(page);
	}

	private fetchCampaigns(page: number): void {
		this.isLoading.set(true);
		this.campaignRepository.getPaginated(page, PAGE_SIZE).subscribe({
			next: (result) => {
				this.campaigns.set(result.data);
				this.totalPages.set(result.metadata.totalPages);
				this.isLoading.set(false);
			},
			error: () => {
				this.isLoading.set(false);
			},
		});
	}
}
