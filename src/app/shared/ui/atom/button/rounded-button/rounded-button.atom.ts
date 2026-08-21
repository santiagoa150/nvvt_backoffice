import { Component, computed, input } from '@angular/core';
import { ColorTypes } from '../../../constant/color-types';

/**
 * This file defines the RoundedButton Atom component.
 */
@Component({
	selector: 'app-rounded-button-atom',
	templateUrl: './rounded-button.atom.html',
})
export class RoundedButtonAtom {
	public readonly color = input.required<ColorTypes>();

	protected readonly colorClasses = computed(() => COLOR_CLASSES[this.color()]);
}

const COLOR_CLASSES: Record<ColorTypes, string> = {
	primary: 'bg-primary-600 text-white hover:bg-primary-700',
	'primary-container': 'bg-primary-100 text-primary-900 hover:bg-primary-200',
	surface: 'bg-white text-primary-900 shadow hover:bg-secondary-50',
};
