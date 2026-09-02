import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../../../../shared/domain/notification';
import { getNotificationActionTranslationKey } from '../../../domain/notification-action';

/**
 * This file defines the NotificationCard Molecule component.
 * It is responsible for rendering a single notification as a card, used on
 * narrow (mobile) viewports instead of a table row.
 */
@Component({
	selector: 'app-notification-card-molecule',
	templateUrl: './notification-card.molecule.html',
	imports: [TranslatePipe],
})
export class NotificationCardMolecule {
	public readonly notification = input.required<Notification>();

	protected readonly actionTranslationKey = computed(() =>
		getNotificationActionTranslationKey(this.notification().action),
	);
}
