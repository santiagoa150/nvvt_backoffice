import { Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * This file defines the Paginator Organism component.
 * It is a reusable, functional pagination control for any paginated list.
 */
@Component({
	selector: 'app-paginator-organism',
	templateUrl: './paginator.organism.html',
	imports: [TranslatePipe],
})
export class PaginatorOrganism {
	public readonly page = input.required<number>();
	public readonly totalPages = input.required<number>();
	public readonly pageChange = output<number>();

	protected readonly canGoPrevious = computed(() => this.page() > 1);
	protected readonly canGoNext = computed(() => this.page() < this.totalPages());

	protected goToPrevious(): void {
		if (this.canGoPrevious()) {
			this.pageChange.emit(this.page() - 1);
		}
	}

	protected goToNext(): void {
		if (this.canGoNext()) {
			this.pageChange.emit(this.page() + 1);
		}
	}
}
