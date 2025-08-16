import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguagesConstants } from '../../../../shared/domain/languages.constants';
import { TranslateRepository } from '../../../../shared/domain/repository/translate.repository';
import { SharedProviders } from '../../../../shared/shared.providers';
import { SharedInjectionTokens } from '../../../../shared/shared.injection-tokens';

/**
 * This file defines the Login Page component.
 * It is responsible for displaying the login interface.
 */
@Component({
	selector: 'app-login-page',
	templateUrl: './login.page.html',
	styleUrl: './login.page.scss',
	imports: [TranslatePipe],
	providers: [SharedProviders.TRANSLATE_REPOSITORY],
})
export class LoginPage {
	private readonly _translateRepository = inject<TranslateRepository>(
		SharedInjectionTokens.TRANSLATE_REPOSITORY,
	);
	protected readonly LanguagesConstants = LanguagesConstants;

	protected changeLang(lang: LanguagesConstants): void {
		this._translateRepository.changeLang(lang);
	}
}
