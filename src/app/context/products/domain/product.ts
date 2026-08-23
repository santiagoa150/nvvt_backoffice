export type ProductStatus = 'ACTIVE' | 'OUT_OF_STOCK';

export interface Product {
	readonly productId: string;
	readonly campaignId: string;
	readonly code: string;
	readonly name: string;
	readonly imageUrl: string;
	readonly catalogPrice: number;
	readonly listPrice: number;
	readonly installmentAmounts: number[];
	readonly quantity: number;
	readonly installments: number;
	readonly page: number;
	readonly status: ProductStatus;
}
