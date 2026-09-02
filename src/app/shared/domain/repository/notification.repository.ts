import { Observable } from 'rxjs';
import { Notification } from '../notification';

/**
 * Repository interface for receiving live notifications from the API.
 */
export interface NotificationRepository {
	/**
	 * Opens a connection to the notifications stream and emits every
	 * notification received for the current user for as long as it's
	 * subscribed to.
	 */
	stream(): Observable<Notification>;
}
