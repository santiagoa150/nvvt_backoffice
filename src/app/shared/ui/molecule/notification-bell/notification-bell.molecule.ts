import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../atom/button/icon-button/icon-button.atom';

const MAX_DISPLAYED_COUNT = 99;

/**
 * This file defines the NotificationBell Molecule component.
 * It is responsible for displaying a bell icon with how many notifications
 * have been received so far. The stream connection is owned by an ancestor
 * (the sidebar) so this presentational bell can be rendered more than once
 * (e.g. once for mobile, once for desktop) without opening extra connections.
 */
@Component({
	selector: 'app-notification-bell-molecule',
	templateUrl: './notification-bell.molecule.html',
	imports: [TranslatePipe, IconButtonAtom],
})
export class NotificationBellMolecule {
	public readonly unreadCount = input<number>(0);

	protected readonly displayCount = computed(() =>
		this.unreadCount() > MAX_DISPLAYED_COUNT ? `${MAX_DISPLAYED_COUNT}+` : `${this.unreadCount()}`,
	);
}
