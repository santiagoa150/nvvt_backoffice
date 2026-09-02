/**
 * A notification pushed from the backend over Server-Sent Events, or read
 * back from the notifications list.
 */
export interface Notification {
	readonly notificationId: string;
	readonly action: string;
	readonly recipient: string;
	readonly seen: boolean;
}
