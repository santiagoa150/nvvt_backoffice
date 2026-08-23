import { Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CardAction, CardActionsMolecule } from '../../../../../shared/ui/molecule/card-actions/card-actions.molecule';
import { Client } from '../../../domain/client';

/**
 * This file defines the ClientCard Molecule component.
 * It is responsible for rendering a single client as a card, used on
 * narrow (mobile) viewports instead of a table row.
 */
@Component({
	selector: 'app-client-card-molecule',
	templateUrl: './client-card.molecule.html',
	imports: [TranslatePipe, CardActionsMolecule],
})
export class ClientCardMolecule {
	public readonly client = input.required<Client>();

	public readonly deleteClient = output<Client>();

	protected readonly cardActions = computed<CardAction[]>(() => {
		const client = this.client();
		return [
			{
				icon: 'delete',
				labelKey: 'clients.list.deleteAction',
				onClick: () => this.deleteClient.emit(client),
			},
		];
	});
}
