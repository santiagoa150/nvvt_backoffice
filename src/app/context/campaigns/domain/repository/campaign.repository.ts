import { Observable } from 'rxjs';
import { Pagination } from '../../../../shared/domain/pagination';
import { Campaign } from '../campaign';

/**
 * Repository interface for campaign read operations against the API.
 */
export interface CampaignRepository {
	/**
	 * Retrieves a page of campaigns.
	 * @param page - The page number to retrieve.
	 * @param limit - The number of campaigns per page.
	 */
	getPaginated(page: number, limit: number): Observable<Pagination<Campaign>>;
}
