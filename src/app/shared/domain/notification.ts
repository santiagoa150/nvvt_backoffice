/**
 * A notification pushed from the backend over Server-Sent Events.
 */
export interface Notification {
	readonly action: string;
	readonly recipient: string;
}
