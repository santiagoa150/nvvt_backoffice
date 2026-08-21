import { Observable } from 'rxjs';
import { AuthTokens } from '../auth-tokens';

/**
 * Repository interface for authentication operations against the API.
 */
export interface AuthRepository {
	/**
	 * Logs in a user with the given credentials.
	 * @param email - The user's email.
	 * @param password - The user's password.
	 */
	login(email: string, password: string): Observable<AuthTokens>;
}
