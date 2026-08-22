import { Provider } from '@angular/core';
import { CampaignApiAdapter } from './infra/adapter/http/campaign-api.adapter';
import { CampaignInjectionTokens } from './campaign.injection-tokens';
import { CampaignProvidersConstants } from './campaign.providers.constants';

/**
 * The CampaignProviders object defines providers for campaign module services.
 */
export const CampaignProviders: Record<CampaignProvidersConstants, Provider> = {
	[CampaignProvidersConstants.CAMPAIGN_REPOSITORY]: {
		provide: CampaignInjectionTokens.CAMPAIGN_REPOSITORY,
		useClass: CampaignApiAdapter,
	},
};
