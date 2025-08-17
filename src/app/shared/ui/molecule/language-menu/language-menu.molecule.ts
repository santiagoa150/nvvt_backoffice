import { Component, inject } from '@angular/core';
import { IconButtonAtom } from '../../atoms/buttons/icon-button/icon-button.atom';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { LanguagesConstants } from '../../../domain/languages.constants';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateRepository } from '../../../domain/repository/translate.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';
import { SharedProviders } from '../../../shared.providers';

@Component({
	selector: 'app-language-menu-molecule',
	templateUrl: './language-menu.molecule.html',
	imports: [IconButtonAtom, MatMenuTrigger, MatMenu, TranslatePipe, MatMenuItem],
	providers: [SharedProviders.TRANSLATE_REPOSITORY],
})
export class LanguageMenuMolecule {
	private readonly _translateRepository: TranslateRepository = inject<TranslateRepository>(
		SharedInjectionTokens.TRANSLATE_REPOSITORY,
	);

	protected readonly languages: LanguagesConstants[] = Object.values(LanguagesConstants);

	/**
	 * This method is called when the user selects a language from the menu.
	 * @param language - The language selected by the user.
	 */
	protected changeLang(language: LanguagesConstants): void {
		this._translateRepository.changeLang(language);
	}
}
