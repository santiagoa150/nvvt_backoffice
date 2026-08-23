import { Product } from '../../products/domain/product';

export type CampaignStatus = 'ACTIVE' | 'SCHEDULED' | 'FINISHED' | 'ARCHIVED';

export interface Campaign {
	readonly campaignId: string;
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly status: CampaignStatus;
}

export interface CampaignSummary {
	readonly totalCatalogPrice: number;
	readonly totalListPrice: number;
	readonly profit: number;
}

export interface CampaignWithProducts extends Campaign {
	readonly products: Product[];
	readonly summary: CampaignSummary;
}

export interface CreateCampaign {
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly status: CampaignStatus;
}
