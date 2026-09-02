import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Notification } from '../../../../../shared/domain/notification';
import { LoadingSpinnerAtom } from '../../../../../shared/ui/atom/loading-spinner/loading-spinner.atom';
import { getNotificationActionTranslationKey } from '../../../domain/notification-action';
import { EmptyNotificationsMolecule } from '../empty-notifications/empty-notifications.molecule';

const ROW_HEIGHT_PX = 65;

/**
 * This file defines the NotificationTable Molecule component.
 * It is responsible for rendering the notification list as a table, used on
 * wider viewports. The header and footer (projected via the "footer" slot)
 * always render; only the body swaps between rows and a loading spinner, and
 * the body always reserves pageSize rows worth of height so the table never
 * resizes, whether it's loading, on a partial last page, or empty.
 */
@Component({
	selector: 'app-notification-table-molecule',
	templateUrl: './notification-table.molecule.html',
	imports: [TranslatePipe, LoadingSpinnerAtom, EmptyNotificationsMolecule],
})
export class NotificationTableMolecule {
	public readonly notifications = input.required<Notification[]>();
	public readonly pageSize = input<number>(10);
	public readonly isLoading = input<boolean>(false);

	protected readonly isEmpty = computed(() => !this.isLoading() && this.notifications().length === 0);
	protected readonly emptyRows = computed(() =>
		Array.from({ length: Math.max(0, this.pageSize() - this.notifications().length) }),
	);
	protected readonly rowHeightPx = ROW_HEIGHT_PX;
	protected readonly bodyHeightPx = computed(() => this.pageSize() * ROW_HEIGHT_PX);

	protected getActionTranslationKey(action: string): string | null {
		return getNotificationActionTranslationKey(action);
	}
}
