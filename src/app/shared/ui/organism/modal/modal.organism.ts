import { Component, output } from '@angular/core';

/**
 * This file defines the Modal Organism component.
 * It is a reusable centered-card modal shell with a backdrop. Callers
 * project their own title, body, and footer content into it.
 */
@Component({
	selector: 'app-modal-organism',
	templateUrl: './modal.organism.html',
})
export class ModalOrganism {
	public readonly backdropClick = output<void>();
}
