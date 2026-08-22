import { InjectionToken } from '@angular/core';
import { CampaignProvidersConstants } from './campaign.providers.constants';

/**
 * The CampaignInjectionTokens object defines injection tokens for campaign module services.
 */
export const CampaignInjectionTokens: Record<CampaignProvidersConstants, InjectionToken<unknown>> = {
	[CampaignProvidersConstants.CAMPAIGN_REPOSITORY]: new InjectionToken<unknown>(
		CampaignProvidersConstants.CAMPAIGN_REPOSITORY,
	),
};
