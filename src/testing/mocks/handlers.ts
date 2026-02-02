/**
 * MSW request handlers for tests.
 * Import and use with setupServer() or in worker when testing API-dependent code.
 *
 * @example
 * import { setupServer } from 'msw/node';
 * import { handlers } from '@/testing/mocks/handlers';
 * const server = setupServer(...handlers);
 */
import type { HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
	// Example: mock auth login
	// http.post('*/auth/login', () => HttpResponse.json({ user: { id: '1', email: 'test@example.com', name: 'Test' }, accessToken: 'token' })),
];
