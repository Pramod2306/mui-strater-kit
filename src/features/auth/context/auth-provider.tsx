import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { LOGIN_PATH } from "@/features/auth/lib/route-guard";

export interface AuthProviderProps {
	children: ReactNode;
	/** When not authenticated, redirect here. Default /login */
	loginPath?: string;
}

/**
 * Wraps children and redirects to login when not authenticated.
 * Use for protecting UI subtrees; for route-level protection use beforeLoad + requireAuth().
 */
export function AuthProvider({ children, loginPath = LOGIN_PATH }: AuthProviderProps) {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: loginPath, replace: true });
		}
	}, [isAuthenticated, loginPath, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
