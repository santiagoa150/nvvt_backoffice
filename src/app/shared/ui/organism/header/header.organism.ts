import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { LanguageMenuMolecule } from '../../molecule/language-menu/language-menu.molecule';

interface LandingNavLink {
	readonly id: string;
	readonly labelKey: string;
}

/**
 * This file defines the Header Organism component.
 * It is responsible for displaying the header of the application, including
 * section navigation links when the user is on the landing page.
 */
@Component({
	selector: 'app-header-organism',
	templateUrl: './header.organism.html',
	imports: [RouterLink, LanguageMenuMolecule, TranslatePipe],
})
export class HeaderOrganism {
	private readonly router = inject(Router);

	private readonly currentUrl = toSignal(
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => this.router.url),
		),
		{ initialValue: this.router.url },
	);

	protected readonly isLandingPage = computed(() => this.currentUrl() === '/');
	protected readonly landingNavLinks: LandingNavLink[] = [
		{ id: 'hero', labelKey: 'landing.nav.hero' },
		{ id: 'features', labelKey: 'landing.nav.features' },
		{ id: 'footer', labelKey: 'landing.nav.footer' },
	];
}
