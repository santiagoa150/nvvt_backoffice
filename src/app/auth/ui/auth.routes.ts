import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';

/**
 * This file defines the routes for the authentication module.
 */
export const authRoutes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
