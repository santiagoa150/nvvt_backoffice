/**
 * Repository interface for persisting key/value data scoped to the current
 * browser tab session (cleared when the tab or window is closed).
 */
export interface SessionStorageRepository {
	/**
	 * Returns the stored value for the given key, or null if it isn't set.
	 */
	getItem(key: string): string | null;

	/**
	 * Persists the given value under the given key.
	 */
	setItem(key: string, value: string): void;

	/**
	 * Removes the stored value for the given key, if any.
	 */
	removeItem(key: string): void;

	/**
	 * Clears every stored value.
	 */
	clear(): void;
}
