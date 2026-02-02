import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

/**
 * Shared UI for 404 / not-found. Used by root (and optionally other routes)
 * via TanStack Router's notFoundComponent.
 */
export function NotFoundPage() {
	return (
		<Box sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
			<Stack spacing={2}>
				<Typography variant="h6" component="h1">
					404 — Page not found
				</Typography>
				<Typography variant="body2" color="text.secondary">
					The page you’re looking for doesn’t exist or was moved.
				</Typography>
				<Button component={Link} to="/" variant="contained">
					Go home
				</Button>
			</Stack>
		</Box>
	);
}
