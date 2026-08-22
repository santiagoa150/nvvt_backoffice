import { Observable } from 'rxjs';
import { Pagination } from '../../../../shared/domain/pagination';
import { Client, CreateClient } from '../client';

/**
 * Repository interface for client operations against the API.
 */
export interface ClientRepository {
	/**
	 * Retrieves a page of clients.
	 * @param page - The page number to retrieve.
	 * @param limit - The number of clients per page.
	 */
	getPaginated(page: number, limit: number): Observable<Pagination<Client>>;

	/**
	 * Creates a new client.
	 * @param client - The client details to create.
	 */
	create(client: CreateClient): Observable<void>;

	/**
	 * Deletes a client by its ID.
	 * @param clientId - The ID of the client to delete.
	 */
	delete(clientId: string): Observable<void>;
}
