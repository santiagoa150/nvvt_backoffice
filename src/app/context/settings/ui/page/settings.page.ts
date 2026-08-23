import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SessionStorageRepository } from '../../../../shared/domain/repository/session-storage.repository';
import { SharedInjectionTokens } from '../../../../shared/shared.injection-tokens';
import { PageHeaderMolecule } from '../../../../shared/ui/molecule/page-header/page-header.molecule';

const PROVIDER_TOKEN_STORAGE_KEY = 'nvvt_settings_provider_token';
const CART_ID_STORAGE_KEY = 'nvvt_settings_cart_id';

/**
 * This file defines the Settings Page component.
 * It is responsible for letting the user store their provider token and
 * cart ID, persisted in session storage as they're typed.
 */
@Component({
	selector: 'app-settings-page',
	templateUrl: './settings.page.html',
	host: { class: 'flex flex-1 flex-col min-h-0' },
	imports: [TranslatePipe, PageHeaderMolecule],
})
export class SettingsPage {
	private readonly sessionStorageRepository = inject<SessionStorageRepository>(
		SharedInjectionTokens.SESSION_STORAGE_REPOSITORY,
	);

	protected readonly providerToken = signal(this.sessionStorageRepository.getItem(PROVIDER_TOKEN_STORAGE_KEY) ?? '');
	protected readonly cartId = signal(this.sessionStorageRepository.getItem(CART_ID_STORAGE_KEY) ?? '');

	/**
	 * This method is called whenever the provider token input changes. It
	 * persists the new value in session storage.
	 */
	protected onProviderTokenChange(value: string): void {
		this.providerToken.set(value);
		this.sessionStorageRepository.setItem(PROVIDER_TOKEN_STORAGE_KEY, value);
	}

	/**
	 * This method is called whenever the cart ID input changes. It persists
	 * the new value in session storage.
	 */
	protected onCartIdChange(value: string): void {
		this.cartId.set(value);
		this.sessionStorageRepository.setItem(CART_ID_STORAGE_KEY, value);
	}
}
