/**
 * Default logger for app-wide use (theme, config, etc.)
 * Can be replaced with a proper logging service in production.
 */
export const logger = {
	// eslint-disable-next-line no-console
	warn: (...args: unknown[]) => console.warn("[mui-template]", ...args),
	// eslint-disable-next-line no-console
	error: (...args: unknown[]) => console.error("[mui-template]", ...args),
	// eslint-disable-next-line no-console
	info: (...args: unknown[]) => console.info("[mui-template]", ...args),
	// eslint-disable-next-line no-console
	debug: (...args: unknown[]) => console.debug("[mui-template]", ...args),
};
