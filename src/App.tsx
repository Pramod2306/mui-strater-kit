import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { I18nProvider, ThemeProvider } from "./shared/context";
import { AppStartupProvider } from "./shared/context/app-startup-provider";

function App() {
	return (
		<AppStartupProvider>
			<I18nProvider>
				<ThemeProvider>
					<RouterProvider router={router} />
				</ThemeProvider>
			</I18nProvider>
		</AppStartupProvider>
	);
}

export default App;
