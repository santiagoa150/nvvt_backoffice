export type AppErrorType = 'http' | 'timeout' | 'unknown';

export interface AppError {
	readonly type: AppErrorType;
	readonly message: string;
	readonly statusCode: number;
	readonly requestId: string;
	readonly path: string;
	readonly details?: unknown;
}
