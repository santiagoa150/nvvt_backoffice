import { Component, input } from '@angular/core';
import { IconButtonAtom } from '../../atom/button/icon-button/icon-button.atom';

/**
 * This file defines the PageHeader Molecule component.
 * It is responsible for displaying a page's title, description, an optional
 * help hint, and a projected action button, reusable across every module.
 */
@Component({
	selector: 'app-page-header-molecule',
	templateUrl: './page-header.molecule.html',
	imports: [IconButtonAtom],
})
export class PageHeaderMolecule {
	public readonly title = input.required<string>();
	public readonly description = input<string>('');
	public readonly helpText = input<string>('');
}
