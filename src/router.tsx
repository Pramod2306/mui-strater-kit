import { router } from "./routes";

export { router };

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
