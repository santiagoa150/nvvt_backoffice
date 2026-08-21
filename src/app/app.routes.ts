import { Routes } from '@angular/router';
import { campaignRoutes } from './context/campaigns/campaign.routes';
import { LandingPage } from './shared/ui/page/landing/landing.page';

/**
 * This file defines the routes for the application.
 */
export const routes: Routes = [
	{ path: '', component: LandingPage, pathMatch: 'full' },
	{ path: 'campaign', children: campaignRoutes },
];
