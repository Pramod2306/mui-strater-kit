import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NotFoundPage, RouteErrorFallback } from "@/shared/ui";

export const rootRoute = createRootRoute({
	component: () => (
		<>
			<Outlet />
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</>
	),
	notFoundComponent: () => <NotFoundPage />,
	errorComponent: ({ error, reset }) => (
		<RouteErrorFallback error={error} reset={reset} />
	),
});



