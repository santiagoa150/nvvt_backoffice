import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { Campaign } from '../../../domain/campaign';

/**
 * This file defines the CampaignCard Molecule component.
 * It is responsible for rendering a single campaign as a card, used on
 * narrow (mobile) viewports instead of a table row.
 */
@Component({
	selector: 'app-campaign-card-molecule',
	templateUrl: './campaign-card.molecule.html',
	imports: [TranslatePipe, IconButtonAtom],
})
export class CampaignCardMolecule {
	public readonly campaign = input.required<Campaign>();
}
