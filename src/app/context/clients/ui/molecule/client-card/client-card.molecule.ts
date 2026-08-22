import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { Client } from '../../../domain/client';

/**
 * This file defines the ClientCard Molecule component.
 * It is responsible for rendering a single client as a card, used on
 * narrow (mobile) viewports instead of a table row.
 */
@Component({
	selector: 'app-client-card-molecule',
	templateUrl: './client-card.molecule.html',
	imports: [TranslatePipe, IconButtonAtom],
})
export class ClientCardMolecule {
	public readonly client = input.required<Client>();

	public readonly deleteClient = output<Client>();
}
