/** Role names – extend as needed for your app */
export type Role = "admin" | "user" | "guest";

/** Permission strings – extend as needed; used with hasPermission() */
export type Permission =
	| "users:read"
	| "users:write"
	| "users:delete"
	| "settings:read"
	| "settings:write";

export interface AuthUser {
	id: string;
	email: string;
	name: string;
	roles: Role[];
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: AuthUser;
	accessToken: string;
	refreshToken?: string;
}

/** Maps each role to the permissions it grants */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
	admin: [
		"users:read",
		"users:write",
		"users:delete",
		"settings:read",
		"settings:write",
	],
	user: ["users:read", "settings:read"],
	guest: [],
};
