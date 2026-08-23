import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * This file defines the EmptyProducts Molecule component.
 * It is responsible for showing an illustration and a short message when a
 * campaign doesn't have any products yet.
 */
@Component({
	selector: 'app-empty-products-molecule',
	templateUrl: './empty-products.molecule.html',
	imports: [TranslatePipe],
})
export class EmptyProductsMolecule {}
