import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../../../../shared/domain/notification';
import { NotificationRepository } from '../../../../../shared/domain/repository/notification.repository';
import { NotificationBadgeStore } from '../../../../../shared/infra/state/notification-badge.store';
import { SharedInjectionTokens } from '../../../../../shared/shared.injection-tokens';
import { SharedProviders } from '../../../../../shared/shared.providers';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { PageHeaderMolecule } from '../../../../../shared/ui/molecule/page-header/page-header.molecule';
import { PaginatorOrganism } from '../../../../../shared/ui/organism/paginator/paginator.organism';
import { EmptyNotificationsMolecule } from '../../molecule/empty-notifications/empty-notifications.molecule';
import { NotificationCardMolecule } from '../../molecule/notification-card/notification-card.molecule';
import { NotificationTableMolecule } from '../../molecule/notification-table/notification-table.molecule';

const PAGE_SIZE = 10;

/**
 * This file defines the Notification List Page component.
 * It is responsible for fetching and displaying a paginated list of the
 * current user's notifications. Entering this page clears the sidebar's
 * unread badge and marks every unseen notification in the current page as
 * seen.
 */
@Component({
	selector: 'app-notification-list-page',
	templateUrl: './notification-list.page.html',
	host: { class: 'flex flex-1 flex-col min-h-0' },
	imports: [
		TranslatePipe,
		LoadingSpinnerAtom,
		PageHeaderMolecule,
		PaginatorOrganism,
		NotificationTableMolecule,
		NotificationCardMolecule,
		EmptyNotificationsMolecule,
	],
	providers: [SharedProviders.NOTIFICATION_REPOSITORY],
})
export class NotificationListPage {
	private readonly notificationRepository = inject<NotificationRepository>(
		SharedInjectionTokens.NOTIFICATION_REPOSITORY,
	);
	private readonly notificationBadge = inject(NotificationBadgeStore);

	protected readonly pageSize = PAGE_SIZE;
	protected readonly notifications = signal<Notification[]>([]);
	protected readonly page = signal(1);
	protected readonly totalPages = signal(1);
	protected readonly isLoading = signal(true);
	protected readonly isEmpty = computed(() => !this.isLoading() && this.notifications().length === 0);

	constructor() {
		this.notificationBadge.reset();
		this.fetchNotifications(this.page());
	}

	/**
	 * This method is called when the user navigates to a different page.
	 * @param page - The page number to load.
	 */
	protected onPageChange(page: number): void {
		this.page.set(page);
		this.fetchNotifications(page);
	}

	private fetchNotifications(page: number): void {
		this.isLoading.set(true);
		this.notificationRepository.getPaginated(page, PAGE_SIZE).subscribe({
			next: (result) => {
				this.notifications.set(result.data);
				this.totalPages.set(Math.max(1, result.metadata.totalPages));
				this.isLoading.set(false);
				this.markUnseenAsSeen(result.data);
			},
			error: () => {
				this.isLoading.set(false);
			},
		});
	}

	/**
	 * Marks every unseen notification in the given page as seen, then updates
	 * the local list so they no longer show as unseen.
	 */
	private markUnseenAsSeen(notifications: Notification[]): void {
		const unseenIds = notifications
			.filter((notification) => !notification.seen)
			.map((notification) => notification.notificationId);

		if (unseenIds.length === 0) {
			return;
		}

		this.notificationRepository.markAsSeen(unseenIds).subscribe(() => {
			this.notifications.update((current) =>
				current.map((notification) =>
					unseenIds.includes(notification.notificationId) ? { ...notification, seen: true } : notification,
				),
			);
		});
	}
}
