import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { ColorTypes } from '../../../constants/color-types';

/**
 * This file defines the IconButton Atom component.
 * It is responsible for displaying an icon button with a specified icon and color.
 */
@Component({
	selector: 'app-icon-button-atom',
	templateUrl: './icon-button.atom.html',
	styleUrls: ['./icon-button.atom.scss'],
	imports: [MatIconButton, MatIcon, NgClass],
})
export class IconButtonAtom {
	public readonly icon = input.required<string>();
	public readonly color = input.required<ColorTypes>();
}
