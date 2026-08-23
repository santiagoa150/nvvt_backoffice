import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PriceAtom } from '../../../../../shared/ui/atom/price/price.atom';
import { Product } from '../../../domain/product';

/**
 * This file defines the ProductCard Molecule component.
 * It is responsible for rendering a single product's full data (image,
 * pricing, quantity, and installments) as a compact row card.
 */
@Component({
	selector: 'app-product-card-molecule',
	templateUrl: './product-card.molecule.html',
	imports: [TranslatePipe, PriceAtom],
})
export class ProductCardMolecule {
	public readonly product = input.required<Product>();

	protected readonly isOutOfStock = computed(() => this.product().status === 'OUT_OF_STOCK');
	protected readonly hasMultipleInstallments = computed(() => this.product().installments > 1);
}
