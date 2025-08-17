import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { IconButtonAtom } from '../../atoms/buttons/icon-button/icon-button.atom';
import { LanguageMenuMolecule } from '../../molecule/language-menu/language-menu.molecule';

/**
 * This file defines the Header Organism component.
 * It is responsible for displaying the header of the application.
 */
@Component({
	selector: 'app-header-organism',
	templateUrl: './header.organism.html',
	styleUrls: ['./header.organism.scss'],
	imports: [MatToolbar, IconButtonAtom, LanguageMenuMolecule],
})
export class HeaderOrganism {
	protected readonly isLoggedIn = false;
}
