import { Routes } from '@angular/router';
import { campaignRoutes } from './context/campaigns/campaign.routes';
import { clientRoutes } from './context/clients/client.routes';
import { notificationRoutes } from './context/notifications/notification.routes';
import { settingsRoutes } from './context/settings/settings.routes';
import { authGuard } from './shared/infra/guard/auth.guard';
import { MainLayout } from './shared/ui/layout/main-layout/main-layout';
import { LandingPage } from './shared/ui/page/landing/landing.page';
import { LoginPage } from './shared/ui/page/login/login.page';

/**
 * This file defines the routes for the application.
 */
export const routes: Routes = [
	{ path: '', component: LandingPage, pathMatch: 'full' },
	{ path: 'login', component: LoginPage },
	{
		path: '',
		component: MainLayout,
		children: [
			{ path: 'campaign', children: campaignRoutes, canActivate: [authGuard] },
			{ path: 'client', children: clientRoutes, canActivate: [authGuard] },
			{ path: 'settings', children: settingsRoutes, canActivate: [authGuard] },
			{ path: 'notifications', children: notificationRoutes, canActivate: [authGuard] },
		],
	},
];
