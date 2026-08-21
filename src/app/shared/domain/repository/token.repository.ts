import { AuthTokens } from '../auth-tokens';

/**
 * Repository interface for persisting and reading the current session's auth tokens.
 */
export interface TokenRepository {
	/**
	 * Persists the given auth tokens for the current session.
	 */
	save(tokens: AuthTokens): void;

	/**
	 * Returns the stored access token, or null if there is no session.
	 */
	getAccessToken(): string | null;

	/**
	 * Returns the stored refresh token, or null if there is no session.
	 */
	getRefreshToken(): string | null;

	/**
	 * Returns whether the user currently has an active session.
	 */
	hasSession(): boolean;

	/**
	 * Clears the stored session, if any.
	 */
	clear(): void;
}
