import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * This file defines the EmptyNotifications Molecule component.
 * It is responsible for showing an illustration and a short message when
 * there are no notifications to display, used by both the desktop table and
 * the mobile card list.
 */
@Component({
	selector: 'app-empty-notifications-molecule',
	templateUrl: './empty-notifications.molecule.html',
	imports: [TranslatePipe],
})
export class EmptyNotificationsMolecule {}
