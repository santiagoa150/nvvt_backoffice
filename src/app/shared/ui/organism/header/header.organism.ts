import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { LanguageMenuMolecule } from '../../molecule/language-menu/language-menu.molecule';

interface LandingNavLink {
	readonly id: string;
	readonly labelKey: string;
}

/**
 * This file defines the Header Organism component.
 * It is responsible for displaying the landing page's header, including
 * its section navigation links.
 */
@Component({
	selector: 'app-header-organism',
	templateUrl: './header.organism.html',
	imports: [RouterLink, LanguageMenuMolecule, TranslatePipe],
})
export class HeaderOrganism {
	private readonly tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);

	protected readonly hasSession = this.tokenRepository.hasSession();
	protected readonly landingNavLinks: LandingNavLink[] = [
		{ id: 'hero', labelKey: 'landing.nav.hero' },
		{ id: 'features', labelKey: 'landing.nav.features' },
		{ id: 'footer', labelKey: 'landing.nav.footer' },
	];
}
