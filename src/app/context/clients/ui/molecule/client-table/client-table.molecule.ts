import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { Client } from '../../../domain/client';
import { EmptyClientsMolecule } from '../empty-clients/empty-clients.molecule';

const ROW_HEIGHT_PX = 65;

/**
 * This file defines the ClientTable Molecule component.
 * It is responsible for rendering the client list as a table, used on
 * wider viewports. The header and footer (projected via the "footer" slot)
 * always render; only the body swaps between rows and a loading spinner, and
 * the body always reserves pageSize rows worth of height so the table never
 * resizes, whether it's loading, on a partial last page, or empty.
 */
@Component({
	selector: 'app-client-table-molecule',
	templateUrl: './client-table.molecule.html',
	imports: [TranslatePipe, IconButtonAtom, LoadingSpinnerAtom, EmptyClientsMolecule],
})
export class ClientTableMolecule {
	public readonly clients = input.required<Client[]>();
	public readonly pageSize = input<number>(10);
	public readonly isLoading = input<boolean>(false);

	protected readonly isEmpty = computed(() => !this.isLoading() && this.clients().length === 0);
	protected readonly emptyRows = computed(() =>
		Array.from({ length: Math.max(0, this.pageSize() - this.clients().length) }),
	);
	protected readonly rowHeightPx = ROW_HEIGHT_PX;
	protected readonly bodyHeightPx = computed(() => this.pageSize() * ROW_HEIGHT_PX);
}
