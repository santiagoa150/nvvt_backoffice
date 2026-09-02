import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CardAction, CardActionsMolecule } from '../../../../../shared/ui/molecule/card-actions/card-actions.molecule';
import { Campaign } from '../../../domain/campaign';

/**
 * This file defines the CampaignCard Molecule component.
 * It is responsible for rendering a single campaign as a card, used on
 * narrow (mobile) viewports instead of a table row.
 */
@Component({
	selector: 'app-campaign-card-molecule',
	templateUrl: './campaign-card.molecule.html',
	imports: [TranslatePipe, CardActionsMolecule],
})
export class CampaignCardMolecule {
	private readonly router = inject(Router);

	public readonly campaign = input.required<Campaign>();

	public readonly deleteCampaign = output<Campaign>();
	public readonly activateCampaign = output<Campaign>();
	public readonly finishCampaign = output<Campaign>();

	protected readonly cardActions = computed<CardAction[]>(() => {
		const campaign = this.campaign();
		const actions: CardAction[] = [
			{
				icon: 'add',
				labelKey: 'campaigns.list.viewAction',
				onClick: () => this.router.navigate(['/campaign/detail', campaign.campaignId]),
			},
		];

		if (campaign.status === 'ACTIVE') {
			actions.push({
				icon: 'flag',
				labelKey: 'campaigns.list.finishAction',
				onClick: () => this.finishCampaign.emit(campaign),
			});
		}

		if (campaign.status === 'SCHEDULED') {
			actions.push({
				icon: 'check_circle',
				labelKey: 'campaigns.list.activateAction',
				onClick: () => this.activateCampaign.emit(campaign),
			});
			actions.push({
				icon: 'delete',
				labelKey: 'campaigns.list.deleteAction',
				onClick: () => this.deleteCampaign.emit(campaign),
			});
		}

		return actions;
	});
}
