import { Routes } from '@angular/router';
import { NotificationListPage } from './ui/page/list/notification-list.page';

/**
 * This file defines the routes for the notifications module.
 */
export const notificationRoutes: Routes = [{ path: '', component: NotificationListPage, pathMatch: 'full' }];
