import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { AuthUser, Permission, Role } from "@/features/auth/types";
import { ROLE_PERMISSIONS } from "@/features/auth/types";

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	login: (user: AuthUser, token: string, refreshToken?: string) => void;
	logout: () => void;
	refreshAccessToken: () => Promise<string | null>;
	hasRole: (role: Role) => boolean;
	hasAnyRole: (roles: Role[]) => boolean;
	hasPermission: (permission: Permission) => boolean;
}

function hasRoleImpl(user: AuthUser | null, role: Role): boolean {
	return user?.roles.includes(role) ?? false;
}

function hasAnyRoleImpl(user: AuthUser | null, roles: Role[]): boolean {
	if (!user) return false;
	return roles.some((r) => user.roles.includes(r));
}

function hasPermissionImpl(
	user: AuthUser | null,
	permission: Permission,
): boolean {
	if (!user) return false;
	return user.roles.some(
		(role) => ROLE_PERMISSIONS[role]?.includes(permission) ?? false,
	);
}

export const useAuthStore = create<AuthState>()(
	immer((set, get) => ({
		user: null,
		token: null,
		refreshToken: null,
		isAuthenticated: false,
		login: (user, token, refreshToken = undefined) => {
			set((state) => {
				state.user = user;
				state.token = token;
				state.refreshToken = refreshToken ?? state.refreshToken;
				state.isAuthenticated = true;
			});
		},
		logout: () => {
			set((state) => {
				state.user = null;
				state.token = null;
				state.refreshToken = null;
				state.isAuthenticated = false;
			});
		},
		refreshAccessToken: async () => {
			// Placeholder: implement when backend refresh endpoint exists
			return null;
		},
		hasRole: (role) => hasRoleImpl(get().user, role),
		hasAnyRole: (roles) => hasAnyRoleImpl(get().user, roles),
		hasPermission: (permission) => hasPermissionImpl(get().user, permission),
	})),
);
