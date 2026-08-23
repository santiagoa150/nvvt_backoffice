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

	/**
	 * Updates the quantity of a product by its ID.
	 * @param productId - The ID of the product to update.
	 * @param quantity - The new quantity for the product.
	 */
	updateQuantity(productId: string, quantity: number): Observable<void>;
}
