import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../../../../shared/domain/notification';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { getNotificationActionTranslationKey, isCampaignReferenceAction } from '../../../domain/notification-action';

/**
 * This file defines the NotificationCard Molecule component.
 * It is responsible for rendering a single notification as a card, used on
 * narrow (mobile) viewports instead of a table row.
 */
@Component({
	selector: 'app-notification-card-molecule',
	templateUrl: './notification-card.molecule.html',
	imports: [TranslatePipe, RouterLink, IconButtonAtom],
})
export class NotificationCardMolecule {
	public readonly notification = input.required<Notification>();

	protected readonly actionTranslationKey = computed(() =>
		getNotificationActionTranslationKey(this.notification().action),
	);

	protected readonly hasCampaignShortcut = computed(
		() => isCampaignReferenceAction(this.notification().action) && !!this.notification().reference,
	);
}
