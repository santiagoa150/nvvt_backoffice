import { Routes } from '@angular/router';
import { ClientListPage } from './ui/page/list/client-list.page';

/**
 * This file defines the routes for the clients module.
 */
export const clientRoutes: Routes = [
	{ path: 'list', component: ClientListPage },
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
];
