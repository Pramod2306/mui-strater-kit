import { create } from "zustand";
import type { Mode } from "@/styles/theme/types";

const STORAGE_KEY = "mui-template-theme-mode";

function getStoredMode(): Mode {
	if (typeof window === "undefined") return "system";
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "system")
			return stored;
	} catch {
		// ignore
	}
	return "system";
}

interface ThemeState {
	mode: Mode;
	setMode: (mode: Mode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
	mode: getStoredMode(),
	setMode: (mode) => {
		set({ mode });
		try {
			localStorage.setItem(STORAGE_KEY, mode);
		} catch {
			// ignore
		}
	},
}));
