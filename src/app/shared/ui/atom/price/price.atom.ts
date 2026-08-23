import { Component, computed, input } from '@angular/core';

const CURRENCY_FORMATTER = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

/**
 * This file defines the Price Atom component.
 * It is responsible for formatting and displaying a monetary amount using
 * the business's local currency convention (a "$" prefix and "." as the
 * thousands separator, with no decimals).
 */
@Component({
	selector: 'app-price-atom',
	templateUrl: './price.atom.html',
})
export class PriceAtom {
	public readonly value = input.required<number>();

	protected readonly formatted = computed(() => `$${CURRENCY_FORMATTER.format(this.value())}`);
}
