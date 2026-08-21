import { Routes } from '@angular/router';
import { CampaignListPage } from './ui/page/list/campaign-list.page';
import { CampaignDetailPage } from './ui/page/detail/campaign-detail.page';

/**
 * This file defines the routes for the campaigns module.
 */
export const campaignRoutes: Routes = [
	{ path: 'list', component: CampaignListPage },
	{ path: 'detail/:id', component: CampaignDetailPage },
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];
