import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { Campaign } from '../../../domain/campaign';

/**
 * This file defines the CampaignTable Molecule component.
 * It is responsible for rendering the campaign list as a table, used on
 * wider viewports.
 */
@Component({
	selector: 'app-campaign-table-molecule',
	templateUrl: './campaign-table.molecule.html',
	imports: [TranslatePipe, IconButtonAtom],
})
export class CampaignTableMolecule {
	public readonly campaigns = input.required<Campaign[]>();
}
