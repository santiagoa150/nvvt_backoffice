import { Routes } from '@angular/router';
import { authRoutes } from './auth/ui/auth.routes';
import { campaignRoutes } from './campaigns/campaign.routes';

/**
 * This file defines the routes for the application.
 */
export const routes: Routes = [
	{ path: 'auth', children: authRoutes },
	{ path: 'campaign', children: campaignRoutes },
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
];
