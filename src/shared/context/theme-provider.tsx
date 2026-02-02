import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { createTheme as createAppTheme } from "@/styles/theme/create-theme";
import type { ColorScheme, Direction, PrimaryColor } from "@/styles/theme/types";
import { useThemeStore } from "@/shared/store";

export interface ThemeProviderProps {
	children: ReactNode;
	primaryColor?: PrimaryColor;
	direction?: Direction;
}

const defaultTheme = createAppTheme({ primaryColor: "neonBlue" });

function resolveColorScheme(mode: "dark" | "light" | "system"): ColorScheme {
	if (mode === "system" && typeof window !== "undefined") {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}
	return mode === "system" ? "light" : mode;
}

export function ThemeProvider({
	children,
	primaryColor = "neonBlue",
	direction,
}: ThemeProviderProps) {
	const mode = useThemeStore((s) => s.mode);
	const theme =
		primaryColor === "neonBlue" && direction === undefined
			? defaultTheme
			: createAppTheme({ primaryColor, direction });

	useEffect(() => {
		const scheme = resolveColorScheme(mode);
		document.documentElement.setAttribute("data-theme", scheme);
	}, [mode]);

	useEffect(() => {
		if (mode !== "system" || typeof window === "undefined") return;
		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => {
			document.documentElement.setAttribute(
				"data-theme",
				mql.matches ? "dark" : "light",
			);
		};
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, [mode]);

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
