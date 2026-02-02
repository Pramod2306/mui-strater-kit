# Auth Feature

## Context & Purpose

- **What**: Handles authentication state (login/logout), RBAC (roles/permissions), and route protection.
- **Business Rules**: Token and user (with `roles`) are stored in Zustand; use selectors when consuming. Route protection via `beforeLoad` + `requireAuth()` / `requireRoles()` / `requirePermission()`. No `useEffect` for data fetching—use TanStack Query in api layer when wiring to backend.

## The Contract (Interface)

- **Inputs**: `LoginForm` expects `onSubmit(data: LoginRequest)` and optional `isLoading`. Form uses RHF + Zod schema (`login-form.schema.ts`); validation via `zodResolver(loginSchema)`. `AuthProvider` wraps children and redirects to login when not authenticated.
- **Outputs**: `useAuthStore` exposes `user`, `token`, `isAuthenticated`, `login`, `logout`, `refreshAccessToken`, `hasRole(role)`, `hasAnyRole(roles)`, `hasPermission(permission)`.
- **Public API**: `useAuthStore`, `authKeys`, `LoginForm`, `AuthProvider`, `requireAuth`, `requireRoles`, `requirePermission`, `LOGIN_PATH`, types `AuthUser`, `LoginRequest`, `LoginResponse`, `Role`, `Permission`, `ROLE_PERMISSIONS`.

## RBAC

- **Roles**: `admin`, `user`, `guest` (extend in `types/index.ts`).
- **Permissions**: e.g. `users:read`, `users:write`, `settings:read`; mapped per role in `ROLE_PERMISSIONS`.
- **Route guards**: In route `beforeLoad`, call `requireAuth()` for auth-only; `requireRoles(['admin'])` for role-based; `requirePermission('users:write')` for permission-based.

## Architecture Mapping (MVC)

- **Model**: Auth state in `store/use-auth-store.ts`; query keys in `api/keys.ts`; route guards in `lib/route-guard.ts`.
- **View**: `ui/forms/login-form.tsx` (RHF + Controller + MUI FormControl; includes "Forgot password?" link to `/auth/forgot-password`); `context/auth-provider.tsx`.
- **Dependencies**: Shared API (`useApi` with `authState`), no other features.

## Testing Status

- Run: `npm test` from project root.
- Use MSW to mock `/auth/login` when testing login flow; use `render` from `@/testing/test-utils`.

## Safe Deletion Checklist

- Remove route entry for login if any.
- Remove exports from this `index.ts`.
- Remove feature README references from root README.
- Confirm no cross-feature imports of auth.
