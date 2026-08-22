import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClientAdapter } from '../../../../../shared/infra/adapter/http/http-client.adapter';
import { Pagination } from '../../../../../shared/domain/pagination';
import { Campaign } from '../../../domain/campaign';
import { CampaignRepository } from '../../../domain/repository/campaign.repository';

interface CampaignResponse {
	readonly campaign_id: string;
	readonly name: string;
	readonly year: number;
	readonly number: number;
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
 * Adapter for campaign read operations against the campaigns API.
 */
@Injectable({ providedIn: 'root' })
export class CampaignApiAdapter implements CampaignRepository {
	private readonly http = inject(HttpClientAdapter);

	getPaginated(page: number, limit: number): Observable<Pagination<Campaign>> {
		return this.http
			.get<PaginationResponse<CampaignResponse>>('/campaigns/', { params: { page, limit } })
			.pipe(map((response) => this.toPagination(response)));
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
		};
	}
}
