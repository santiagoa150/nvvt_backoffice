import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { LanguageMenuMolecule } from '../../molecule/language-menu/language-menu.molecule';

interface SidebarModule {
	readonly icon: string;
	readonly labelKey: string;
	readonly route: string;
}

/**
 * This file defines the Sidebar Organism component.
 * It is responsible for displaying the app's primary navigation across every
 * page except the landing page and the login page.
 */
@Component({
	selector: 'app-sidebar-organism',
	templateUrl: './sidebar.organism.html',
	imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageMenuMolecule],
})
export class SidebarOrganism {
	private readonly tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);
	private readonly router = inject(Router);
	private readonly languageMenu = viewChild(LanguageMenuMolecule);

	protected readonly isOpen = signal(false);
	protected readonly isLanguageMenuOpen = signal(false);
	protected readonly asideClasses = computed(() => {
		const width = this.isOpen() ? 'w-screen sm:w-64' : 'w-0 sm:w-20';
		const overflow = this.isLanguageMenuOpen() ? 'overflow-visible' : 'overflow-hidden';
		return `${width} ${overflow}`;
	});
	protected readonly modules: SidebarModule[] = [
		{ icon: 'campaign', labelKey: 'sidebar.modules.campaigns', route: '/campaign' },
	];

	/**
	 * This method is called when the user clicks the hamburger icon.
	 * It toggles the sidebar between its collapsed and expanded state.
	 */
	protected toggle(): void {
		this.isOpen.update((current) => !current);
		this.languageMenu()?.close();
	}

	/**
	 * This method is called when the user clicks a module link, so the
	 * language dropdown does not stay open over the newly loaded page.
	 */
	protected onModuleClick(): void {
		this.languageMenu()?.close();
	}

	/**
	 * This method is called when the user clicks the logout button.
	 * It closes the current session and redirects to the login page.
	 */
	protected logout(): void {
		this.languageMenu()?.close();
		this.tokenRepository.clear();
		this.router.navigateByUrl('/login');
	}
}
