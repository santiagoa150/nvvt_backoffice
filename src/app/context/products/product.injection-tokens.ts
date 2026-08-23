import { InjectionToken } from '@angular/core';
import { ProductProvidersConstants } from './product.providers.constants';

/**
 * The ProductInjectionTokens object defines injection tokens for product module services.
 */
export const ProductInjectionTokens: Record<ProductProvidersConstants, InjectionToken<unknown>> = {
	[ProductProvidersConstants.PRODUCT_REPOSITORY]: new InjectionToken<unknown>(
		ProductProvidersConstants.PRODUCT_REPOSITORY,
	),
};
