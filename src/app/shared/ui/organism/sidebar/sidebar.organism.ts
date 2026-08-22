import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SessionStorageRepository } from '../../../domain/repository/session-storage.repository';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { LanguageMenuMolecule } from '../../molecule/language-menu/language-menu.molecule';

interface SidebarModule {
	readonly icon: string;
	readonly labelKey: string;
	readonly route: string;
}

const SIDEBAR_OPEN_STORAGE_KEY = 'nvvt_sidebar_open';

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
	private readonly sessionStorageRepository = inject<SessionStorageRepository>(
		SharedInjectionTokens.SESSION_STORAGE_REPOSITORY,
	);
	private readonly router = inject(Router);
	private readonly languageMenu = viewChild(LanguageMenuMolecule);

	protected readonly isOpen = signal(this.readStoredOpenState());
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
		this.sessionStorageRepository.setItem(SIDEBAR_OPEN_STORAGE_KEY, String(this.isOpen()));
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
		this.sessionStorageRepository.clear();
		this.router.navigateByUrl('/login');
	}

	/**
	 * Reads the sidebar's open/closed state from session storage. Defaults to
	 * open when there is no stored value yet.
	 */
	private readStoredOpenState(): boolean {
		const stored = this.sessionStorageRepository.getItem(SIDEBAR_OPEN_STORAGE_KEY);
		return stored === null ? true : stored === 'true';
	}
}
