import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthTokens } from '../../../domain/auth-tokens';
import { AuthRepository } from '../../../domain/repository/auth.repository';
import { HttpClientAdapter } from './http-client.adapter';

interface LoginResponse {
	readonly access_token: string;
	readonly refresh_token: string;
}

/**
 * Adapter for authentication operations against the auth API.
 */
@Injectable({ providedIn: 'root' })
export class AuthApiAdapter implements AuthRepository {
	private readonly http = inject(HttpClientAdapter);

	login(email: string, password: string): Observable<AuthTokens> {
		return this.http
			.post<LoginResponse>('/auth/login', { email, password })
			.pipe(map((response) => this.toAuthTokens(response)));
	}

	private toAuthTokens(response: LoginResponse): AuthTokens {
		return {
			accessToken: response.access_token,
			refreshToken: response.refresh_token,
		};
	}
}
