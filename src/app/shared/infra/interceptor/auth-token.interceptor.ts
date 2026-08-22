import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenRepository } from '../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../shared.injection-tokens';

/**
 * Interceptor that attaches the current session's access token, if any,
 * as a Bearer Authorization header on every outgoing request.
 */
export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
	const tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);
	const accessToken = tokenRepository.getAccessToken();

	if (!accessToken) {
		return next(request);
	}

	return next(request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }));
};
