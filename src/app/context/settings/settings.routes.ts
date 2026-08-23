import { Routes } from '@angular/router';
import { SettingsPage } from './ui/page/settings.page';

/**
 * This file defines the routes for the settings module.
 */
export const settingsRoutes: Routes = [{ path: '', component: SettingsPage, pathMatch: 'full' }];
