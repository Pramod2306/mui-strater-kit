/**
 * Centralized Endpoint Manifest
 * Never hardcode URL strings inside Services - use API_ENDPOINTS constant
 */

/**
 * Base URL for API requests
 * Reads from environment variable, falls back to localhost for development
 */
export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * API Endpoints grouped by domain
 * Add new endpoint groups as features are implemented
 *
 * @example
 * // Usage in a service:
 * import { API_ENDPOINTS } from '@/shared/api';
 * const response = await api.get(API_ENDPOINTS.AUTH.LOGIN);
 */
export const API_ENDPOINTS = {
	AUTH: {
		LOGIN: "/auth/login",
		LOGOUT: "/auth/logout",
		REFRESH: "/auth/refresh",
		REGISTER: "/auth/register",
	},
	// USERS: { LIST: '/users', DETAIL: (id: string) => `/users/${id}`, PROFILE: '/users/profile' },
} as const;

/**
 * Type for extracting endpoint values
 */
export type ApiEndpoint = typeof API_ENDPOINTS;
