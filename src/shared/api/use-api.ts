import { useMemo } from "react";
import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from "axios";

import { API_BASE_URL } from "./endpoints";
import type { ApiResponse, ApiError, AuthState } from "./types";

/**
 * Configuration options for the API hook
 */
interface UseApiOptions {
	/**
	 * Auth state from Zustand store
	 * Pass undefined if auth module is not yet implemented
	 */
	authState?: AuthState;
}

/**
 * API client interface with typed helper methods
 */
interface ApiClient {
	/** The underlying Axios instance */
	instance: AxiosInstance;
	/** GET request with typed response */
	get: <T>(url: string, config?: AxiosRequestConfig) => Promise<ApiResponse<T>>;
	/** POST request with typed response */
	post: <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => Promise<ApiResponse<T>>;
	/** PUT request with typed response */
	put: <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => Promise<ApiResponse<T>>;
	/** PATCH request with typed response */
	patch: <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	) => Promise<ApiResponse<T>>;
	/** DELETE request with typed response */
	delete: <T>(
		url: string,
		config?: AxiosRequestConfig,
	) => Promise<ApiResponse<T>>;
}

/**
 * Base Factory Hook for Axios instance
 *
 * Creates a memoized Axios instance with request/response interceptors.
 * Provides typed helper methods for common HTTP operations.
 *
 * @param options - Configuration options including auth state
 * @returns ApiClient with typed methods
 *
 * @example
 * ```tsx
 * // In a service or hook:
 * const api = useApi({ authState: useAuthStore() });
 *
 * // Make typed requests:
 * const response = await api.get<User[]>('/users');
 * console.log(response.data); // User[]
 * ```
 */
export function useApi(options: UseApiOptions = {}): ApiClient {
	const { authState } = options;

	const instance = useMemo(() => {
		const axiosInstance = axios.create({
			baseURL: API_BASE_URL,
			headers: {
				"Content-Type": "application/json",
			},
			timeout: 30000, // 30 seconds
		});

		// ==========================================
		// REQUEST INTERCEPTOR
		// ==========================================
		axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// Inject Authorization header if token exists
				if (authState?.token) {
					config.headers.Authorization = `Bearer ${authState.token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		// ==========================================
		// RESPONSE INTERCEPTOR
		// ==========================================
		axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => {
				// Return the response data directly (assumes envelope structure)
				return response;
			},
			async (error) => {
				const originalRequest = error.config;

				// Handle 401 Unauthorized errors
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					// TODO: Implement token refresh logic when auth module is ready
					// if (authState?.refreshAccessToken) {
					//   try {
					//     const newToken = await authState.refreshAccessToken();
					//     if (newToken) {
					//       originalRequest.headers.Authorization = `Bearer ${newToken}`;
					//       return axiosInstance(originalRequest);
					//     }
					//   } catch (refreshError) {
					//     // Refresh failed, logout user
					//     authState?.logout();
					//     // TODO: Redirect to login page using TanStack Router
					//     // router.navigate({ to: '/login' });
					//   }
					// }

					// For now, just logout if auth state exists
					if (authState?.logout) {
						console.warn("[API] 401 Unauthorized - logging out user");
						authState.logout();
					}
				}

				// Transform error to ApiError format if possible
				const apiError: ApiError = {
					status: error.response?.status || 500,
					message:
						error.response?.data?.message ||
						error.message ||
						"An unexpected error occurred",
					error: error.response?.data?.error || [],
				};

				return Promise.reject(apiError);
			},
		);

		return axiosInstance;
	}, [authState]);

	// ==========================================
	// TYPED HELPER METHODS
	// ==========================================

	const get = async <T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> => {
		const response = await instance.get<ApiResponse<T>>(url, config);
		return response.data;
	};

	const post = async <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> => {
		const response = await instance.post<ApiResponse<T>>(url, data, config);
		return response.data;
	};

	const put = async <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> => {
		const response = await instance.put<ApiResponse<T>>(url, data, config);
		return response.data;
	};

	const patch = async <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> => {
		const response = await instance.patch<ApiResponse<T>>(url, data, config);
		return response.data;
	};

	const del = async <T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> => {
		const response = await instance.delete<ApiResponse<T>>(url, config);
		return response.data;
	};

	return {
		instance,
		get,
		post,
		put,
		patch,
		delete: del,
	};
}
