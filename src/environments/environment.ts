import { Environment } from './environment.type';

/**
 * This file contains the environment configuration for development mode.
 * It is used to set up the application for development purposes.
 */
export const environment: Environment = {
	NODE_ENV: 'development',
	API_URL: 'http://localhost:8000/api/v1',
};
