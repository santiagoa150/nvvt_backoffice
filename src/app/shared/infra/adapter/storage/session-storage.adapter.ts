import { Injectable } from '@angular/core';
import { SessionStorageRepository } from '../../../domain/repository/session-storage.repository';

/**
 * Adapter for persisting key/value data in the browser's session storage.
 */
@Injectable({ providedIn: 'root' })
export class SessionStorageAdapter implements SessionStorageRepository {
	getItem(key: string): string | null {
		return sessionStorage.getItem(key);
	}

	setItem(key: string, value: string): void {
		sessionStorage.setItem(key, value);
	}

	removeItem(key: string): void {
		sessionStorage.removeItem(key);
	}

	clear(): void {
		sessionStorage.clear();
	}
}
