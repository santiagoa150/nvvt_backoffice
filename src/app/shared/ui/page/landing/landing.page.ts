import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { RoundedButtonAtom } from '../../atom/button/rounded-button/rounded-button.atom';
import { HeaderOrganism } from '../../organism/header/header.organism';

/**
 * This file defines the Landing Page component.
 * It is responsible for presenting the application to first-time visitors.
 */
@Component({
	selector: 'app-landing-page',
	templateUrl: './landing.page.html',
	imports: [RouterLink, TranslatePipe, RoundedButtonAtom, HeaderOrganism],
})
export class LandingPage {
	private readonly tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);

	protected readonly currentYear = new Date().getFullYear();
	protected readonly ctaRoute = this.tokenRepository.hasSession() ? '/campaign' : '/login';
}
