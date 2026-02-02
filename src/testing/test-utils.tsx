import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { createTheme } from "@/styles/theme/create-theme";

const theme = createTheme({ primaryColor: "neonBlue" });

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});
}

interface AllTheProvidersProps {
	children: React.ReactNode;
}

function AllTheProviders({ children }: AllTheProvidersProps) {
	const queryClient = createTestQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
	return render(ui, {
		wrapper: AllTheProviders,
		...options,
	});
}

export * from "@testing-library/react";
export { customRender as render };
