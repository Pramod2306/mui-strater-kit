/**
 * Query key factory for auth feature
 */
export const authKeys = {
	all: ["auth"] as const,
	me: () => [...authKeys.all, "me"] as const,
};
