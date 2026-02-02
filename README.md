# MUI Template

A React startup template with MUI, TanStack Router, TanStack Query, Zustand, and a feature-driven (FDD + MVC) structure. Use this as the base for new apps so you don’t repeat setup every time.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **MUI 7** + Emotion (theme in `src/styles/theme/`)
- **TanStack Router** (file-based routes in `src/routes/`)
- **TanStack Query** (data fetching)
- **Zustand** + Immer (global state)
- **Axios** (shared API in `src/shared/api/`)
- **Vitest** + **Testing Library** + **MSW** (tests)

## Quick start

```bash
cp .env.example .env   # optional: set VITE_API_BASE_URL
npm install
npm run dev
```

- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Tests:** `npm test` or `npm run test:run`
- **Lint:** `npm run lint`

## Folder structure

- **`src/features/`** – Feature modules (auth, users, …). Each has `api/`, `hooks/`, `ui/`, `types/`, and a public `index.ts`.
- **`src/shared/api/`** – Base API (endpoints, `useApi`, types).
- **`src/shared/ui/`** – Reusable, logic-free components.
- **`src/styles/theme/`** – MUI theme (colors, typography, component overrides).
- **`src/routes/`** – TanStack Router file-based routes (`__root.tsx`, `index.tsx`, …).
- **`src/app/`** – App shell (e.g. `providers.tsx` with QueryClient, Theme, Router).
- **`src/testing/`** – `test-utils.tsx` (custom `render` with Theme + QueryClient), `setup.ts`, MSW handlers in `mocks/`.

Use the **`@/`** path alias (e.g. `import { X } from '@/features/auth'`).

## Adding a feature

1. Create `src/features/<feature-name>/` with:
   - `api/keys.ts` – query key factory
   - `hooks/` – business logic
   - `ui/components/`, `ui/forms/`, `ui/layouts/` as needed
   - `types/` – DTOs
   - `index.ts` – public API only
   - `README.md` – context, contract, testing (see `src/features/auth/README.md`)
2. Add routes under `src/routes/` if the feature has pages.
3. Add tests in `src/features/<feature-name>/__tests__/` using `render` from `@/testing/test-utils` and MSW for API.

See `.cursor/rules/code-structure.mdc` and `.cursor/rules/doc-sstructure.mdc` for FDD + MVC and doc rules.

## Safe deletion

When removing a feature: remove its route entry, remove exports from its `index.ts`, update root README, and confirm no cross-feature imports.
