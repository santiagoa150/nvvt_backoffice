import { Provider } from '@angular/core';
import { ProductApiAdapter } from './infra/adapter/http/product-api.adapter';
import { ProductInjectionTokens } from './product.injection-tokens';
import { ProductProvidersConstants } from './product.providers.constants';

/**
 * The ProductProviders object defines providers for product module services.
 */
export const ProductProviders: Record<ProductProvidersConstants, Provider> = {
	[ProductProvidersConstants.PRODUCT_REPOSITORY]: {
		provide: ProductInjectionTokens.PRODUCT_REPOSITORY,
		useClass: ProductApiAdapter,
	},
};
