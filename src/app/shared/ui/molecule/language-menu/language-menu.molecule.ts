import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { IconButtonAtom } from '../../atom/button/icon-button/icon-button.atom';
import { LanguagesConstants } from '../../../domain/languages.constants';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateRepository } from '../../../domain/repository/translate.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { SharedProviders } from '../../../shared.providers';

/**
 * This file defines the LanguageMenu Molecule component.
 * It is responsible for displaying a menu that allows users to select a language.
 */
@Component({
	selector: 'app-language-menu-molecule',
	templateUrl: './language-menu.molecule.html',
	imports: [IconButtonAtom, TranslatePipe],
	providers: [SharedProviders.TRANSLATE_REPOSITORY],
})
export class LanguageMenuMolecule {
	private readonly _translateRepository: TranslateRepository = inject<TranslateRepository>(
		SharedInjectionTokens.TRANSLATE_REPOSITORY,
	);

	/**
	 * Where this menu is rendered, so the dropdown opens towards visible space:
	 * "header" opens downward aligned to the right, "sidebar" opens upward aligned to the left.
	 */
	public readonly variant = input<'header' | 'sidebar'>('header');

	/**
	 * Emits whenever the dropdown opens or closes, so an ancestor that clips
	 * overflow (e.g. a collapsed sidebar) can temporarily allow it through.
	 */
	public readonly openChange = output<boolean>();

	protected readonly languages: LanguagesConstants[] = Object.values(LanguagesConstants);
	protected readonly isOpen = signal(false);
	protected readonly menuPositionClasses = computed(() =>
		this.variant() === 'sidebar' ? 'bottom-full left-0 mb-1' : 'top-full right-0 mt-1',
	);

	constructor() {
		effect(() => this.openChange.emit(this.isOpen()));
	}

	/**
	 * This method is called when the user toggles the language menu open or closed.
	 */
	protected toggleMenu(): void {
		this.isOpen.update((current) => !current);
	}

	/**
	 * Closes the dropdown. Exposed so a parent can dismiss it when the user
	 * triggers any other action, e.g. another sidebar button.
	 */
	public close(): void {
		this.isOpen.set(false);
	}

	/**
	 * This method is called when the user selects a language from the menu.
	 * @param language - The language selected by the user.
	 */
	protected changeLang(language: LanguagesConstants): void {
		this._translateRepository.changeLang(language);
		this.isOpen.set(false);
	}
}
