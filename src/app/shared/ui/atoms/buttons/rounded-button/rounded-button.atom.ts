import { Component, input } from '@angular/core';
import { ColorTypes } from '../../../constants/color-types';
import { NgClass } from '@angular/common';

/**
 * This file defines the RoundedButton Atom component.
 */
@Component({
	selector: 'app-rounded-button-atom',
	templateUrl: './rounded-button.atom.html',
	styleUrl: './rounded-button.atom.scss',
	imports: [NgClass],
})
export class RoundedButtonAtom {
	public readonly color = input.required<ColorTypes>();
}
