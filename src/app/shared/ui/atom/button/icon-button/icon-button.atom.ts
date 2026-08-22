import { Component, computed, input } from '@angular/core';
import { ColorTypes } from '../../../constant/color-types';

/**
 * This file defines the IconButton Atom component.
 * It is responsible for displaying an icon button with a specified icon and color.
 */
@Component({
	selector: 'app-icon-button-atom',
	templateUrl: './icon-button.atom.html',
})
export class IconButtonAtom {
	public readonly icon = input.required<string>();
	public readonly color = input.required<ColorTypes>();
	public readonly variant = input<'ghost' | 'filled'>('ghost');

	protected readonly shapeClasses = computed(() =>
		this.variant() === 'filled'
			? `rounded-lg ${FILLED_COLOR_CLASSES[this.color()]}`
			: 'rounded-full hover:bg-black/5',
	);
	protected readonly iconColorClasses = computed(() =>
		this.variant() === 'filled' ? '' : GHOST_COLOR_CLASSES[this.color()],
	);
}

const GHOST_COLOR_CLASSES: Record<ColorTypes, string> = {
	primary: 'text-primary-600',
	'primary-container': 'text-primary-900',
	surface: 'text-neutral-800',
};

const FILLED_COLOR_CLASSES: Record<ColorTypes, string> = {
	primary: 'bg-primary-600 text-white hover:bg-primary-700',
	'primary-container': 'bg-primary-100 text-primary-900 hover:bg-primary-200',
	surface: 'bg-white text-primary-900 shadow hover:bg-secondary-50',
};
