import { createRoute, createRouter, redirect } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import authRoute from "@/features/auth/routes";

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	beforeLoad: () => {
		// Redirect / to /auth; later use dashboard path when authenticated
		throw redirect({ to: "/auth", replace: true });
	},
	component: () => null,
});

export const routeTree = rootRoute.addChildren([indexRoute, authRoute]);

export const router = createRouter({ routeTree });  
