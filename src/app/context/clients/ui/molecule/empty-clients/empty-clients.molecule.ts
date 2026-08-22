import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * This file defines the EmptyClients Molecule component.
 * It is responsible for showing an illustration and a short message when
 * there are no clients to display, used by both the desktop table and the
 * mobile card list.
 */
@Component({
	selector: 'app-empty-clients-molecule',
	templateUrl: './empty-clients.molecule.html',
	imports: [TranslatePipe],
})
export class EmptyClientsMolecule {}
