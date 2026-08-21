import { Routes } from '@angular/router';
import { campaignRoutes } from './context/campaigns/campaign.routes';
import { authGuard } from './shared/infra/guard/auth.guard';
import { LandingPage } from './shared/ui/page/landing/landing.page';
import { LoginPage } from './shared/ui/page/login/login.page';

/**
 * This file defines the routes for the application.
 */
export const routes: Routes = [
	{ path: '', component: LandingPage, pathMatch: 'full' },
	{ path: 'login', component: LoginPage },
	{ path: 'campaign', children: campaignRoutes, canActivate: [authGuard] },
];
