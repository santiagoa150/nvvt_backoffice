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

	protected readonly iconColorClasses = computed(() => COLOR_CLASSES[this.color()]);
}

const COLOR_CLASSES: Record<ColorTypes, string> = {
	primary: 'text-primary-600',
	'primary-container': 'text-primary-900',
	surface: 'text-neutral-800',
};
