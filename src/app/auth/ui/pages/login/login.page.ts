import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguagesConstants } from '../../../../shared/domain/languages.constants';
import { TranslateRepository } from '../../../../shared/domain/repository/translate.repository';
import { SharedProviders } from '../../../../shared/shared.providers';
import { SharedInjectionTokens } from '../../../../shared/shared.injection-tokens';
import { RoundedButtonAtom } from '../../../../shared/ui/atoms/buttons/rounded-button/rounded-button.atom';

/**
 * This file defines the Login Page component.
 * It is responsible for displaying the login interface.
 */
@Component({
	selector: 'app-login-page',
	templateUrl: './login.page.html',
	styleUrl: './login.page.scss',
	imports: [TranslatePipe, RoundedButtonAtom],
	providers: [SharedProviders.TRANSLATE_REPOSITORY],
})
export class LoginPage {
	private readonly _translateRepository = inject<TranslateRepository>(
		SharedInjectionTokens.TRANSLATE_REPOSITORY,
	);
	protected readonly isLoggedIn = false;
	protected readonly LanguagesConstants = LanguagesConstants;

	/**
	 * This method is called when the user starts an action, such as clicking a button.
	 * It checks if the user is logged in and performs actions accordingly.
	 */
	protected onStartAction(): void {
		if (this.isLoggedIn) {
			// Implement logic for when the user is logged in
		} else {
			window.scrollTo({ top: 700, behavior: 'smooth' });
		}
	}
}
