import { Routes } from '@angular/router';
import { CampaignListPage } from './pages/list/campaign-list.page';
import { CampaignDetailPage } from './pages/detail/campaign-detail.page';

/**
 * This file defines the routes for the campaigns module.
 */
export const campaignRoutes: Routes = [
	{ path: 'list', component: CampaignListPage },
	{ path: 'detail/:id', component: CampaignDetailPage },
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];
