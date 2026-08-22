export interface PaginationMetadata {
	readonly total: number;
	readonly totalPages: number;
	readonly page: number;
}

export interface Pagination<T> {
	readonly data: T[];
	readonly metadata: PaginationMetadata;
}
