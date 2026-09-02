import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClientAdapter } from '../http/http-client.adapter';
import { Notification } from '../../../domain/notification';
import { Pagination } from '../../../domain/pagination';
import { NotificationRepository } from '../../../domain/repository/notification.repository';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';

interface NotificationResponse {
	readonly notification_id: string;
	readonly action: string;
	readonly recipient: string;
	readonly seen: boolean;
	readonly reference: string | null;
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
 * Adapter that streams notifications over Server-Sent Events using fetch
 * (since the native EventSource API can't attach the Authorization header
 * the backend requires), and reads/updates them over the regular HTTP API.
 */
@Injectable({ providedIn: 'root' })
export class NotificationSseAdapter implements NotificationRepository {
	private readonly tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);
	private readonly http = inject(HttpClientAdapter);

	stream(): Observable<Notification> {
		return new Observable<Notification>((subscriber) => {
			const controller = new AbortController();
			const accessToken = this.tokenRepository.getAccessToken();

			fetch(`${environment.API_URL}/notifications/stream`, {
				headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
				signal: controller.signal,
			})
				.then((response) => this.consume(response, subscriber))
				.catch((error: unknown) => {
					if (!controller.signal.aborted) {
						subscriber.error(error);
					}
				});

			return () => controller.abort();
		});
	}

	getPaginated(page: number, limit: number): Observable<Pagination<Notification>> {
		return this.http
			.get<PaginationResponse<NotificationResponse>>('/notifications/', { params: { page, limit } })
			.pipe(map((response) => this.toPagination(response)));
	}

	markAsSeen(notificationIds: string[]): Observable<void> {
		return this.http.patch<void>('/notifications/seen', { notification_ids: notificationIds });
	}

	private async consume(
		response: Response,
		subscriber: { next: (value: Notification) => void; complete: () => void },
	): Promise<void> {
		if (!response.body) {
			subscriber.complete();
			return;
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = '';

		for (;;) {
			const { value, done } = await reader.read();
			if (done) {
				break;
			}

			buffer += decoder.decode(value, { stream: true });
			const events = buffer.split('\n\n');
			buffer = events.pop() ?? '';

			for (const event of events) {
				const notification = this.parseNotification(event);
				if (notification) {
					subscriber.next(notification);
				}
			}
		}

		subscriber.complete();
	}

	private parseNotification(event: string): Notification | null {
		const dataLine = event.split('\n').find((line) => line.startsWith('data:'));
		if (!dataLine) {
			return null;
		}

		return this.toNotification(JSON.parse(dataLine.slice('data:'.length).trim()) as NotificationResponse);
	}

	private toPagination(response: PaginationResponse<NotificationResponse>): Pagination<Notification> {
		return {
			data: response.data.map((notification) => this.toNotification(notification)),
			metadata: {
				total: response.metadata.total,
				totalPages: response.metadata.total_pages,
				page: response.metadata.page,
			},
		};
	}

	private toNotification(response: NotificationResponse): Notification {
		return {
			notificationId: response.notification_id,
			action: response.action,
			recipient: response.recipient,
			seen: response.seen,
			reference: response.reference,
		};
	}
}
