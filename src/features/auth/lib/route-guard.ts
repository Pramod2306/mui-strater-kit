import { redirect } from "@tanstack/react-router";
import type { Permission, Role } from "@/features/auth/types";
import { useAuthStore } from "@/features/auth/store/use-auth-store";

const LOGIN_PATH = "/login";

/**
 * Use in route beforeLoad to require authentication.
 * Redirects to /login with redirect search param when not authenticated.
 */
export function requireAuth(options?: { redirectTo?: string }) {
	const { isAuthenticated } = useAuthStore.getState();
	if (!isAuthenticated) {
		throw redirect({
			to: options?.redirectTo ?? LOGIN_PATH,
			search: { redirect: window.location.pathname + window.location.search },
			replace: true,
		});
	}
}

/**
 * Use in route beforeLoad to require one of the given roles.
 * Call after requireAuth() or ensure user is loaded.
 * Redirects to / when user lacks required roles.
 */
export function requireRoles(roles: Role[], options?: { redirectTo?: string }) {
	const { user, isAuthenticated } = useAuthStore.getState();
	if (!isAuthenticated || !user) {
		throw redirect({ to: options?.redirectTo ?? LOGIN_PATH, replace: true });
	}
	const allowed = roles.some((r) => user.roles.includes(r));
	if (!allowed) {
		throw redirect({ to: "/", replace: true });
	}
}

/**
 * Use in route beforeLoad to require a permission.
 * Call after requireAuth(). Redirects to / when user lacks permission.
 */
export function requirePermission(
	permission: Permission,
	options?: { redirectTo?: string },
) {
	const { user, isAuthenticated, hasPermission } = useAuthStore.getState();
	if (!isAuthenticated || !user) {
		throw redirect({ to: options?.redirectTo ?? LOGIN_PATH, replace: true });
	}
	if (!hasPermission(permission)) {
		throw redirect({ to: "/", replace: true });
	}
}

export { LOGIN_PATH };
