import { Injectable } from '@angular/core';
import { AuthTokens } from '../../../domain/auth-tokens';
import { TokenRepository } from '../../../domain/repository/token.repository';

const ACCESS_TOKEN_KEY = 'nvvt_access_token';
const REFRESH_TOKEN_KEY = 'nvvt_refresh_token';

/**
 * Adapter for persisting the session's auth tokens in the browser's local storage.
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageTokenAdapter implements TokenRepository {
	save(tokens: AuthTokens): void {
		localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
		localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
	}

	getAccessToken(): string | null {
		return localStorage.getItem(ACCESS_TOKEN_KEY);
	}

	getRefreshToken(): string | null {
		return localStorage.getItem(REFRESH_TOKEN_KEY);
	}

	hasSession(): boolean {
		return this.getAccessToken() !== null;
	}

	clear(): void {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	}
}
