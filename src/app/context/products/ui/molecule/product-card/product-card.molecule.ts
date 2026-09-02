import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppError } from '../../../../../shared/domain/error/exception';
import { IconButtonAtom } from '../../../../../shared/ui/atom/button/icon-button/icon-button.atom';
import { PriceAtom } from '../../../../../shared/ui/atom/price/price.atom';
import { Product } from '../../../domain/product';
import { ProductRepository } from '../../../domain/repository/product.repository';
import { ProductInjectionTokens } from '../../../product.injection-tokens';

/**
 * This file defines the ProductCard Molecule component.
 * It is responsible for rendering a single product's full data (image,
 * pricing, quantity, and installments) as a compact row card.
 */
@Component({
	selector: 'app-product-card-molecule',
	templateUrl: './product-card.molecule.html',
	imports: [TranslatePipe, PriceAtom, IconButtonAtom],
})
export class ProductCardMolecule {
	private readonly productRepository = inject<ProductRepository>(ProductInjectionTokens.PRODUCT_REPOSITORY);

	public readonly product = input.required<Product>();
	public readonly deletable = input<boolean>(false);
	public readonly quantityEditable = input<boolean>(false);

	public readonly deleteProduct = output<Product>();
	public readonly quantityUpdated = output<{ product: Product; quantity: number }>();

	protected readonly isOutOfStock = computed(() => this.product().status === 'OUT_OF_STOCK');
	protected readonly hasMultipleInstallments = computed(() => this.product().installments > 1);
	protected readonly totalListPrice = computed(() => this.product().listPrice * this.product().quantity);
	protected readonly totalCatalogPrice = computed(() => this.product().catalogPrice * this.product().quantity);

	protected readonly isListPriceUnitVisible = signal(false);
	protected readonly isCatalogPriceUnitVisible = signal(false);

	protected readonly pendingQuantity = signal(0);
	protected readonly isUpdatingQuantity = signal(false);
	protected readonly updateQuantityError = signal<AppError | null>(null);
	protected readonly hasPendingQuantityChange = computed(() => this.pendingQuantity() !== this.product().quantity);
	protected readonly isAtMinQuantity = computed(() => this.pendingQuantity() <= 1);

	constructor() {
		effect(() => {
			this.pendingQuantity.set(this.product().quantity);
		});
	}

	protected toggleListPriceUnit(): void {
		this.isListPriceUnitVisible.update((isVisible) => !isVisible);
	}

	protected toggleCatalogPriceUnit(): void {
		this.isCatalogPriceUnitVisible.update((isVisible) => !isVisible);
	}

	protected onDecrement(): void {
		this.updateQuantityError.set(null);
		this.pendingQuantity.update((quantity) => Math.max(1, quantity - 1));
	}

	protected onIncrement(): void {
		this.updateQuantityError.set(null);
		this.pendingQuantity.update((quantity) => quantity + 1);
	}

	protected onConfirmQuantity(): void {
		const quantity = this.pendingQuantity();
		this.isUpdatingQuantity.set(true);
		this.updateQuantityError.set(null);
		this.productRepository.updateQuantity(this.product().productId, quantity).subscribe({
			next: () => {
				this.isUpdatingQuantity.set(false);
				this.quantityUpdated.emit({ product: this.product(), quantity });
			},
			error: (error: AppError) => {
				this.isUpdatingQuantity.set(false);
				this.updateQuantityError.set(error);
			},
		});
	}
}
