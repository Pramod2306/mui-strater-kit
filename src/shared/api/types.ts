/**
 * Standardized API Response Contracts
 * All API responses must adhere to the "Envelope" structure
 */

/**
 * Success response envelope
 * @template T - The type of the response payload
 */
export interface ApiResponse<T> {
	/** HTTP Status Code */
	status: number;
	/** Human-readable summary */
	message: string;
	/** The actual payload */
	data: T;
}

/**
 * Error response envelope
 */
export interface ApiError {
	/** HTTP Error Code */
	status: number;
	/** Error summary for the user */
	message: string;
	/** Detailed validation or stack errors */
	error: Record<string, unknown> | unknown[];
}

/**
 * Auth store interface (placeholder for future auth module)
 * This will be implemented by the Zustand auth store
 */
export interface AuthState {
	/** JWT access token */
	token: string | null;
	/** Refresh token for token renewal */
	refreshToken: string | null;
	/** Logout action - clears auth state */
	logout: () => void;
	/** Token refresh action */
	refreshAccessToken: () => Promise<string | null>;
}

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
	return (
		typeof error === "object" &&
		error !== null &&
		"status" in error &&
		"message" in error &&
		"error" in error
	);
}
