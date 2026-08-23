import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { Campaign } from '../../../domain/campaign';
import { EmptyCampaignsMolecule } from '../empty-campaigns/empty-campaigns.molecule';

const ROW_HEIGHT_PX = 65;

/**
 * This file defines the CampaignTable Molecule component.
 * It is responsible for rendering the campaign list as a table, used on
 * wider viewports. The header and footer (projected via the "footer" slot)
 * always render; only the body swaps between rows and a loading spinner, and
 * the body always reserves pageSize rows worth of height so the table never
 * resizes, whether it's loading, on a partial last page, or empty.
 */
@Component({
	selector: 'app-campaign-table-molecule',
	templateUrl: './campaign-table.molecule.html',
	imports: [TranslatePipe, RouterLink, IconButtonAtom, LoadingSpinnerAtom, EmptyCampaignsMolecule],
})
export class CampaignTableMolecule {
	public readonly campaigns = input.required<Campaign[]>();
	public readonly pageSize = input<number>(10);
	public readonly isLoading = input<boolean>(false);

	public readonly deleteCampaign = output<Campaign>();
	public readonly activateCampaign = output<Campaign>();

	protected readonly isEmpty = computed(() => !this.isLoading() && this.campaigns().length === 0);
	protected readonly emptyRows = computed(() =>
		Array.from({ length: Math.max(0, this.pageSize() - this.campaigns().length) }),
	);
	protected readonly rowHeightPx = ROW_HEIGHT_PX;
	protected readonly bodyHeightPx = computed(() => this.pageSize() * ROW_HEIGHT_PX);
}
