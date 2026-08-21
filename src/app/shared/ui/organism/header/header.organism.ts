import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageMenuMolecule } from '../../molecule/language-menu/language-menu.molecule';

/**
 * This file defines the Header Organism component.
 * It is responsible for displaying the header of the application.
 */
@Component({
	selector: 'app-header-organism',
	templateUrl: './header.organism.html',
	imports: [RouterLink, LanguageMenuMolecule],
})
export class HeaderOrganism {}
