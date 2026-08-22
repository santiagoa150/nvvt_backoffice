import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppError } from '../../../../../shared/domain/error/exception';
import { RoundedButtonAtom } from '../../../../../shared/ui/atom/button/rounded-button/rounded-button.atom';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { PageHeaderMolecule } from '../../../../../shared/ui/molecule/page-header/page-header.molecule';
import { ConfirmDialogOrganism } from '../../../../../shared/ui/organism/confirm-dialog/confirm-dialog.organism';
import { PaginatorOrganism } from '../../../../../shared/ui/organism/paginator/paginator.organism';
import { ClientInjectionTokens } from '../../../client.injection-tokens';
import { ClientProviders } from '../../../client.providers';
import { Client } from '../../../domain/client';
import { ClientRepository } from '../../../domain/repository/client.repository';
import { ClientCardMolecule } from '../../molecule/client-card/client-card.molecule';
import { ClientTableMolecule } from '../../molecule/client-table/client-table.molecule';
import { EmptyClientsMolecule } from '../../molecule/empty-clients/empty-clients.molecule';
import { CreateClientModalOrganism } from '../../organism/create-client-modal/create-client-modal.organism';

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
		CreateClientModalOrganism,
		ConfirmDialogOrganism,
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
	protected readonly isCreateModalOpen = signal(false);

	protected readonly pendingDelete = signal<Client | null>(null);
	protected readonly isDeleting = signal(false);
	protected readonly deleteError = signal<AppError | null>(null);

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

	/**
	 * This method is called when a new client was created through the modal.
	 * It closes the modal and refreshes the list from the first page.
	 */
	protected onClientCreated(): void {
		this.isCreateModalOpen.set(false);
		this.page.set(1);
		this.fetchClients(1);
	}

	/**
	 * This method is called when the user requests to delete a client from
	 * the list. It opens the confirmation dialog for that client.
	 */
	protected onDeleteRequested(client: Client): void {
		this.deleteError.set(null);
		this.pendingDelete.set(client);
	}

	/**
	 * This method is called when the user dismisses the delete confirmation
	 * dialog without confirming.
	 */
	protected onDeleteDismissed(): void {
		this.pendingDelete.set(null);
		this.deleteError.set(null);
	}

	/**
	 * This method is called when the user confirms the deletion of the
	 * pending client. It deletes it via the clients API and refreshes the
	 * current page.
	 */
	protected onDeleteConfirmed(): void {
		const client = this.pendingDelete();
		if (!client) {
			return;
		}

		this.isDeleting.set(true);
		this.clientRepository.delete(client.clientId).subscribe({
			next: () => {
				this.isDeleting.set(false);
				this.pendingDelete.set(null);
				this.fetchClients(this.page());
			},
			error: (error: AppError) => {
				this.isDeleting.set(false);
				this.deleteError.set(error);
			},
		});
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
