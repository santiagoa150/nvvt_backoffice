import { Component, input, output } from '@angular/core';
import { RoundedButtonAtom } from '../../atom/button/rounded-button/rounded-button.atom';
import { ModalOrganism } from '../modal/modal.organism';

/**
 * This file defines the ConfirmDialog Organism component.
 * It is a reusable "are you sure?" confirmation modal with a title, a
 * message, and cancel/confirm actions. Callers can project extra content
 * (e.g. an error message) into the "error" slot.
 */
@Component({
	selector: 'app-confirm-dialog-organism',
	templateUrl: './confirm-dialog.organism.html',
	imports: [RoundedButtonAtom, ModalOrganism],
})
export class ConfirmDialogOrganism {
	public readonly title = input.required<string>();
	public readonly message = input.required<string>();
	public readonly confirmLabel = input.required<string>();
	public readonly cancelLabel = input.required<string>();
	public readonly isConfirming = input<boolean>(false);

	public readonly confirmed = output<void>();
	public readonly dismiss = output<void>();
}
