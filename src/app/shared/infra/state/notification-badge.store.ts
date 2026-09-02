import { Injectable, signal } from '@angular/core';

/**
 * Holds the unread notifications count shown on the sidebar's bell badge.
 * Shared between the sidebar (which increments it as notifications stream
 * in) and the notifications list page (which resets it once its contents
 * have been marked as seen).
 */
@Injectable({ providedIn: 'root' })
export class NotificationBadgeStore {
	public readonly unreadCount = signal(0);

	public increment(): void {
		this.unreadCount.update((count) => count + 1);
	}

	public reset(): void {
		this.unreadCount.set(0);
	}
}
