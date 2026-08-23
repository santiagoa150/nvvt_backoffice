import { Observable } from 'rxjs';

/**
 * Repository interface for product operations against the API.
 */
export interface ProductRepository {
	/**
	 * Deletes a product by its ID.
	 * @param productId - The ID of the product to delete.
	 */
	delete(productId: string): Observable<void>;
}
