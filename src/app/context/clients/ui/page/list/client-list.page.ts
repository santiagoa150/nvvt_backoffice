import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RoundedButtonAtom } from '../../../../../shared/ui/atom/button/rounded-button/rounded-button.atom';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { PageHeaderMolecule } from '../../../../../shared/ui/molecule/page-header/page-header.molecule';
import { PaginatorOrganism } from '../../../../../shared/ui/organism/paginator/paginator.organism';
import { ClientInjectionTokens } from '../../../client.injection-tokens';
import { ClientProviders } from '../../../client.providers';
import { Client } from '../../../domain/client';
import { ClientRepository } from '../../../domain/repository/client.repository';
import { ClientCardMolecule } from '../../molecule/client-card/client-card.molecule';
import { ClientTableMolecule } from '../../molecule/client-table/client-table.molecule';
import { EmptyClientsMolecule } from '../../molecule/empty-clients/empty-clients.molecule';

const PAGE_SIZE = 10;

/**
 * This file defines the Client List Page component.
 * It is responsible for fetching and displaying a paginated list of clients.
 */
@Component({
	selector: 'app-client-list-page',
	templateUrl: './client-list.page.html',
	host: { class: 'flex flex-1 flex-col min-h-0' },
	imports: [
		TranslatePipe,
		RoundedButtonAtom,
		LoadingSpinnerAtom,
		PageHeaderMolecule,
		PaginatorOrganism,
		ClientTableMolecule,
		ClientCardMolecule,
		EmptyClientsMolecule,
	],
	providers: [ClientProviders.CLIENT_REPOSITORY],
})
export class ClientListPage {
	private readonly clientRepository = inject<ClientRepository>(ClientInjectionTokens.CLIENT_REPOSITORY);

	protected readonly pageSize = PAGE_SIZE;
	protected readonly clients = signal<Client[]>([]);
	protected readonly page = signal(1);
	protected readonly totalPages = signal(1);
	protected readonly isLoading = signal(true);
	protected readonly isEmpty = computed(() => !this.isLoading() && this.clients().length === 0);

	constructor() {
		this.fetchClients(this.page());
	}

	/**
	 * This method is called when the user navigates to a different page.
	 * @param page - The page number to load.
	 */
	protected onPageChange(page: number): void {
		this.page.set(page);
		this.fetchClients(page);
	}

	private fetchClients(page: number): void {
		this.isLoading.set(true);
		this.clientRepository.getPaginated(page, PAGE_SIZE).subscribe({
			next: (result) => {
				this.clients.set(result.data);
				this.totalPages.set(Math.max(1, result.metadata.totalPages));
				this.isLoading.set(false);
			},
			error: () => {
				this.isLoading.set(false);
			},
		});
	}
}
