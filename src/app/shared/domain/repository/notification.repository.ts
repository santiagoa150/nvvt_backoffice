import { Observable } from 'rxjs';
import { Notification } from '../notification';
import { Pagination } from '../pagination';

/**
 * Repository interface for receiving and reading notifications from the API.
 */
export interface NotificationRepository {
	/**
	 * Opens a connection to the notifications stream and emits every
	 * notification received for the current user for as long as it's
	 * subscribed to.
	 */
	stream(): Observable<Notification>;

	/**
	 * Retrieves a page of the current user's notifications, unseen ones first.
	 * @param page - The page number to retrieve.
	 * @param limit - The number of notifications per page.
	 */
	getPaginated(page: number, limit: number): Observable<Pagination<Notification>>;

	/**
	 * Marks the given notifications as seen.
	 * @param notificationIds - The IDs of the notifications to mark as seen.
	 */
	markAsSeen(notificationIds: string[]): Observable<void>;
}
