import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenRepository } from '../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../shared.injection-tokens';

/**
 * Route guard that blocks access to routes requiring an active session,
 * redirecting to the login page when there is none.
 */
export const authGuard: CanActivateFn = () => {
	const tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);
	const router = inject(Router);

	if (tokenRepository.hasSession()) {
		return true;
	}

	return router.createUrlTree(['/login']);
};
