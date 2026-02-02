/**
 * Auth feature - Public API
 */
export { useAuthStore } from "./store/use-auth-store";
export { authKeys } from "./api/keys";
export * from "./ui";
export * from "./routes";

export { AuthProvider } from "./context";
export type { AuthProviderProps } from "./context";
export {
	requireAuth,
	requireRoles,
	requirePermission,
	LOGIN_PATH,
} from "./lib/route-guard";
export type {
	AuthUser,
	LoginRequest,
	LoginResponse,
	Role,
	Permission,
} from "./types";
export { ROLE_PERMISSIONS } from "./types";
