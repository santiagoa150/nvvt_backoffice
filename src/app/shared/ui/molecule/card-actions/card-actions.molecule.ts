import { Component, computed, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../atom/button/icon-button/icon-button.atom';

const DROPDOWN_THRESHOLD = 3;

export interface CardAction {
	readonly icon: string;
	readonly labelKey: string;
	readonly onClick: () => void;
}

/**
 * This file defines the CardActions Molecule component.
 * It renders a card's actions as inline icon buttons, or as a single
 * dropdown menu once there are 3 or more of them, so a card never gets
 * crowded with buttons as more actions become available.
 */
@Component({
	selector: 'app-card-actions-molecule',
	templateUrl: './card-actions.molecule.html',
	imports: [IconButtonAtom, TranslatePipe],
})
export class CardActionsMolecule {
	public readonly actions = input.required<CardAction[]>();

	protected readonly useDropdown = computed(() => this.actions().length >= DROPDOWN_THRESHOLD);
	protected readonly isOpen = signal(false);

	protected toggle(): void {
		this.isOpen.update((isOpen) => !isOpen);
	}

	protected close(): void {
		this.isOpen.set(false);
	}

	protected trigger(action: CardAction): void {
		action.onClick();
		this.close();
	}
}
