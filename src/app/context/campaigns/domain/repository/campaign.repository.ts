import { Observable } from 'rxjs';
import { Pagination } from '../../../../shared/domain/pagination';
import { Campaign, CampaignWithProducts, CreateCampaign } from '../campaign';

/**
 * Repository interface for campaign operations against the API.
 */
export interface CampaignRepository {
	/**
	 * Retrieves a page of campaigns.
	 * @param page - The page number to retrieve.
	 * @param limit - The number of campaigns per page.
	 */
	getPaginated(page: number, limit: number): Observable<Pagination<Campaign>>;

	/**
	 * Retrieves a campaign, along with its products and their pricing
	 * summary, by its ID.
	 * @param campaignId - The ID of the campaign to retrieve.
	 */
	getById(campaignId: string): Observable<CampaignWithProducts>;

	/**
	 * Creates a new campaign.
	 * @param campaign - The campaign details to create.
	 */
	create(campaign: CreateCampaign): Observable<void>;

	/**
	 * Deletes a campaign by its ID.
	 * @param campaignId - The ID of the campaign to delete.
	 */
	delete(campaignId: string): Observable<void>;

	/**
	 * Activates a campaign by its ID.
	 * @param campaignId - The ID of the campaign to activate.
	 */
	activate(campaignId: string): Observable<void>;
}
