import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Notification } from '../../../domain/notification';
import { NotificationRepository } from '../../../domain/repository/notification.repository';
import { TokenRepository } from '../../../domain/repository/token.repository';
import { SharedInjectionTokens } from '../../../shared.injection-tokens';

/**
 * Adapter that streams notifications over Server-Sent Events using fetch,
 * since the native EventSource API can't attach the Authorization header
 * the backend requires.
 */
@Injectable({ providedIn: 'root' })
export class NotificationSseAdapter implements NotificationRepository {
	private readonly tokenRepository = inject<TokenRepository>(SharedInjectionTokens.TOKEN_REPOSITORY);

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

		return JSON.parse(dataLine.slice('data:'.length).trim()) as Notification;
	}
}
