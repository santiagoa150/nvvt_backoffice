import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarOrganism } from '../../organism/sidebar/sidebar.organism';

/**
 * This file defines the Main Layout component.
 * It wraps every page other than the landing page and the login page with
 * the app's sidebar navigation.
 */
@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.html',
	imports: [RouterOutlet, SidebarOrganism],
})
export class MainLayout {}
