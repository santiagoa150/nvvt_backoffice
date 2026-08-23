import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientAdapter } from '../../../../../shared/infra/adapter/http/http-client.adapter';
import { ProductRepository } from '../../../domain/repository/product.repository';

/**
 * Adapter for product operations against the products API.
 */
@Injectable({ providedIn: 'root' })
export class ProductApiAdapter implements ProductRepository {
	private readonly http = inject(HttpClientAdapter);

	delete(productId: string): Observable<void> {
		return this.http.delete<void>(`/products/${productId}`);
	}
}
