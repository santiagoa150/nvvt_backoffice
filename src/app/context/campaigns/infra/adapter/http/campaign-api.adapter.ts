import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpClientAdapter } from '../../../../../shared/infra/adapter/http/http-client.adapter';
import { Pagination } from '../../../../../shared/domain/pagination';
import { Product, ProductStatus } from '../../../../products/domain/product';
import {
	Campaign,
	CampaignStatus,
	CampaignSummary,
	CampaignWithProducts,
	CreateCampaign,
} from '../../../domain/campaign';
import { CampaignRepository } from '../../../domain/repository/campaign.repository';

interface CampaignResponse {
	readonly campaign_id: string;
	readonly name: string;
	readonly year: number;
	readonly number: number;
	readonly status: CampaignStatus;
}

interface ProductResponse {
	readonly product_id: string;
	readonly campaign_id: string;
	readonly code: string;
	readonly name: string;
	readonly image_url: string;
	readonly catalog_price: number;
	readonly list_price: number;
	readonly installment_amounts: number[];
	readonly quantity: number;
	readonly installments: number;
	readonly page: number;
	readonly status: ProductStatus;
}

interface CampaignSummaryResponse {
	readonly total_catalog_price: number;
	readonly total_list_price: number;
	readonly profit: number;
}

interface CampaignWithProductsResponse extends CampaignResponse {
	readonly products: ProductResponse[];
	readonly summary: CampaignSummaryResponse;
}

interface PaginationResponse<T> {
	readonly data: T[];
	readonly metadata: {
		readonly total: number;
		readonly total_pages: number;
		readonly page: number;
	};
}

/**
 * Adapter for campaign operations against the campaigns API.
 */
@Injectable({ providedIn: 'root' })
export class CampaignApiAdapter implements CampaignRepository {
	private readonly http = inject(HttpClientAdapter);

	getPaginated(page: number, limit: number): Observable<Pagination<Campaign>> {
		return this.http
			.get<PaginationResponse<CampaignResponse>>('/campaigns/', { params: { page, limit } })
			.pipe(map((response) => this.toPagination(response)));
	}

	getById(campaignId: string): Observable<CampaignWithProducts> {
		return this.http
			.get<CampaignWithProductsResponse>(`/campaigns/${campaignId}`)
			.pipe(map((response) => this.toCampaignWithProducts(response)));
	}

	create(campaign: CreateCampaign): Observable<void> {
		return this.http.post<void>('/campaigns/', {
			name: campaign.name,
			year: campaign.year,
			number: campaign.number,
			status: campaign.status,
		});
	}

	delete(campaignId: string): Observable<void> {
		return this.http.delete<void>(`/campaigns/${campaignId}`);
	}

	activate(campaignId: string): Observable<void> {
		return this.http.patch<void>(`/campaigns/${campaignId}/activate`, {});
	}

	private toPagination(response: PaginationResponse<CampaignResponse>): Pagination<Campaign> {
		return {
			data: response.data.map((campaign) => this.toCampaign(campaign)),
			metadata: {
				total: response.metadata.total,
				totalPages: response.metadata.total_pages,
				page: response.metadata.page,
			},
		};
	}

	private toCampaign(response: CampaignResponse): Campaign {
		return {
			campaignId: response.campaign_id,
			name: response.name,
			year: response.year,
			number: response.number,
			status: response.status,
		};
	}

	private toCampaignWithProducts(response: CampaignWithProductsResponse): CampaignWithProducts {
		return {
			...this.toCampaign(response),
			products: response.products.map((product) => this.toProduct(product)),
			summary: this.toCampaignSummary(response.summary),
		};
	}

	private toCampaignSummary(response: CampaignSummaryResponse): CampaignSummary {
		return {
			totalCatalogPrice: response.total_catalog_price,
			totalListPrice: response.total_list_price,
			profit: response.profit,
		};
	}

	private toProduct(response: ProductResponse): Product {
		return {
			productId: response.product_id,
			campaignId: response.campaign_id,
			code: response.code,
			name: response.name,
			imageUrl: this.toAbsoluteAssetUrl(response.image_url),
			catalogPrice: response.catalog_price,
			listPrice: response.list_price,
			installmentAmounts: response.installment_amounts,
			quantity: response.quantity,
			installments: response.installments,
			page: response.page,
			status: response.status,
		};
	}

	private toAbsoluteAssetUrl(path: string): string {
		return path.startsWith('/') ? `${environment.ASSET_BASE_URL}${path}` : path;
	}
}
