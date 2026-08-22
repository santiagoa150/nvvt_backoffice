import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClientAdapter } from '../../../../../shared/infra/adapter/http/http-client.adapter';
import { Pagination } from '../../../../../shared/domain/pagination';
import { Client, CreateClient } from '../../../domain/client';
import { ClientRepository } from '../../../domain/repository/client.repository';

interface ClientPhoneResponse {
	readonly country_code: number;
	readonly number: string;
}

interface ClientResponse {
	readonly client_id: string;
	readonly given_names: string;
	readonly family_names: string | null;
	readonly phone: ClientPhoneResponse | null;
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
 * Adapter for client read operations against the clients API.
 */
@Injectable({ providedIn: 'root' })
export class ClientApiAdapter implements ClientRepository {
	private readonly http = inject(HttpClientAdapter);

	getPaginated(page: number, limit: number): Observable<Pagination<Client>> {
		return this.http
			.get<PaginationResponse<ClientResponse>>('/clients/', { params: { page, limit } })
			.pipe(map((response) => this.toPagination(response)));
	}

	create(client: CreateClient): Observable<void> {
		return this.http.post<void>('/clients/', {
			given_names: client.givenNames,
			family_names: client.familyNames,
			phone_number: client.phoneNumber,
			country_phone_code: client.countryPhoneCode,
		});
	}

	delete(clientId: string): Observable<void> {
		return this.http.delete<void>(`/clients/${clientId}`);
	}

	private toPagination(response: PaginationResponse<ClientResponse>): Pagination<Client> {
		return {
			data: response.data.map((client) => this.toClient(client)),
			metadata: {
				total: response.metadata.total,
				totalPages: response.metadata.total_pages,
				page: response.metadata.page,
			},
		};
	}

	private toClient(response: ClientResponse): Client {
		return {
			clientId: response.client_id,
			fullName: response.family_names ? `${response.given_names} ${response.family_names}` : response.given_names,
			phone: response.phone ? `+${response.phone.country_code} ${response.phone.number}` : null,
		};
	}
}
