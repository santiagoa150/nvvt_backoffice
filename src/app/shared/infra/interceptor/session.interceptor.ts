import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenRepository } from '../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../shared.injection-tokens';

/**
 * Interceptor that closes the current session and redirects to the login page
 * whenever an API call comes back unauthorized.
 */
export const sessionInterceptor: HttpInterceptorFn = (request, next) => {
	const tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);
	const router = inject(Router);

	return next(request).pipe(
		catchError((error: unknown) => {
			if (error instanceof HttpErrorResponse && error.status === 401) {
				tokenRepository.clear();
				router.navigateByUrl('/login');
			}
			return throwError(() => error);
		}),
	);
};
