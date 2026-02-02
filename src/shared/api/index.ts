/**
 * Shared API Module - Public API
 *
 * This module provides the foundational API layer for the application.
 * All feature services should import from this barrel export.
 *
 * @example
 * ```tsx
 * import { useApi, API_ENDPOINTS, type ApiResponse } from '@/shared/api';
 * ```
 */

// Response contract types
export type { ApiResponse, ApiError, AuthState } from "./types";
export { isApiError } from "./types";

// Endpoint manifest
export { API_BASE_URL, API_ENDPOINTS, type ApiEndpoint } from "./endpoints";

// Base factory hook
export { useApi } from "./use-api";
