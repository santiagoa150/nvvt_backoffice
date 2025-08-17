import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { IconButtonAtom } from '../../atoms/buttons/icon-button/icon-button.atom';

/**
 * This file defines the Header Organism component.
 * It is responsible for displaying the header of the application.
 */
@Component({
	selector: 'app-header-organism',
	templateUrl: './header.organism.html',
	styleUrls: ['./header.organism.scss'],
	imports: [MatToolbar, IconButtonAtom],
})
export class HeaderOrganism {}
