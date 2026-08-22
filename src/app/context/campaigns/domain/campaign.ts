export interface Campaign {
	readonly campaignId: string;
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly isActive: boolean;
}

export interface CreateCampaign {
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly isActive: boolean;
}
