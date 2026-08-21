import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, TimeoutError, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { APP_ERROR_MESSAGES } from '../../../domain/error/app-error.constant';
import { AppError } from '../../../domain/error/exception';

export interface HttpRequestOptions {
	headers?: HttpHeaders | Record<string, string | string[]>;
	params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
	context?: HttpContext;
}

/**
 * Adapter around Angular's HttpClient that resolves requests against the API base URL
 * and normalizes failures into a typed AppError.
 */
@Injectable({ providedIn: 'root' })
export class HttpClientAdapter {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = environment.API_URL;

	get<T>(path: string, options?: HttpRequestOptions): Observable<T> {
		return this.execute(this.http.get<T>(this.buildUrl(path), options), path);
	}

	post<T>(path: string, body: unknown, options?: HttpRequestOptions): Observable<T> {
		return this.execute(this.http.post<T>(this.buildUrl(path), body, options), path);
	}

	put<T>(path: string, body: unknown, options?: HttpRequestOptions): Observable<T> {
		return this.execute(this.http.put<T>(this.buildUrl(path), body, options), path);
	}

	patch<T>(path: string, body: unknown, options?: HttpRequestOptions): Observable<T> {
		return this.execute(this.http.patch<T>(this.buildUrl(path), body, options), path);
	}

	delete<T>(path: string, options?: HttpRequestOptions): Observable<T> {
		return this.execute(this.http.delete<T>(this.buildUrl(path), options), path);
	}

	private buildUrl(path: string): string {
		return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
	}

	private execute<T>(request: Observable<T>, path: string): Observable<T> {
		return request.pipe(
			catchError((error: unknown) => {
				const appError = this.mapError(error, path);
				this.logError(appError);
				return throwError(() => appError);
			}),
		);
	}

	private logError(error: AppError): void {
		console.error(`[HttpClientAdapter] ${error.type} error on ${error.path}`, error);
	}

	private mapError(error: unknown, path: string): AppError {
		if (error instanceof TimeoutError) {
			return {
				type: 'timeout',
				message: APP_ERROR_MESSAGES.TIMEOUT,
				statusCode: 408,
				requestId: '',
				path,
			};
		}

		if (error instanceof HttpErrorResponse) {
			return {
				type: 'http',
				message: this.extractMessage(error),
				statusCode: error.status,
				requestId: error.headers.get('x-request-id') ?? '',
				path: error.url ?? path,
				details: error.error,
			};
		}

		return {
			type: 'unknown',
			message: error instanceof Error ? error.message : APP_ERROR_MESSAGES.UNKNOWN,
			statusCode: 500,
			requestId: '',
			path,
			details: error,
		};
	}

	private extractMessage(error: HttpErrorResponse): string {
		const body = error.error as { message?: string } | null;
		return body?.message ?? error.message;
	}
}
