import { Observable } from 'rxjs';
import { Pagination } from '../../../../shared/domain/pagination';
import { Client } from '../client';

/**
 * Repository interface for client read operations against the API.
 */
export interface ClientRepository {
	/**
	 * Retrieves a page of clients.
	 * @param page - The page number to retrieve.
	 * @param limit - The number of clients per page.
	 */
	getPaginated(page: number, limit: number): Observable<Pagination<Client>>;
}
