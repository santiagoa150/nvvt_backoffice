export type CampaignStatus = 'ACTIVE' | 'SCHEDULED' | 'FINISHED' | 'ARCHIVED';

export interface Campaign {
	readonly campaignId: string;
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly status: CampaignStatus;
}

export interface CreateCampaign {
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly status: CampaignStatus;
}
