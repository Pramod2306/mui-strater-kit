import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/assets/lang/en.json";

export const defaultNS = "translation";

i18n.use(initReactI18next).init({
	resources: {
		en: { [defaultNS]: en },
	},
	lng: "en",
	fallbackLng: "en",
	defaultNS,
	interpolation: {
		escapeValue: false,
	},
});

export { i18n };
