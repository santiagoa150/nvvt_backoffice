import { Observable } from 'rxjs';
import { Country } from '../country';

/**
 * Repository interface for country operations against the API.
 */
export interface CountryRepository {
	/**
	 * Retrieves every country.
	 */
	getAll(): Observable<Country[]>;
}
