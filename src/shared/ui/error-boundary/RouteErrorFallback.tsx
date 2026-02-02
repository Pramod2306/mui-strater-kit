import { Box, Button, Stack, Typography } from "@mui/material";

export interface RouteErrorFallbackProps {
	error: Error;
	/** Passed by TanStack Router's CatchBoundary when used as errorComponent */
	reset?: () => void;
}

/**
 * Shared UI for route-level error fallback. Used by root (and optionally other routes)
 * via TanStack Router's errorComponent. Accepts error and optional reset from the router.
 */
export function RouteErrorFallback({ error, reset }: RouteErrorFallbackProps) {
	return (
		<Box sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
			<Stack spacing={2}>
				<Typography variant="h6" component="h1">
					Something went wrong
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{error?.message ?? "An unexpected error occurred."}
				</Typography>
				<Stack direction="row" spacing={1}>
					{typeof reset === "function" && (
						<Button variant="contained" onClick={reset}>
							Try again
						</Button>
					)}
				</Stack>
			</Stack>
		</Box>
	);
}
