import { Routes } from '@angular/router';
import { authRoutes } from './auth/ui/auth.routes';
import { campaignRoutes } from './campaigns/campaign.routes';

/**
 * This file defines the routes for the application.
 */
export const routes: Routes = [
	{ path: 'campaign', children: campaignRoutes },
	{ path: 'auth', children: authRoutes },
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
];
