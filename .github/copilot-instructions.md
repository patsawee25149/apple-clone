# Copilot Instructions for apple-clone

## Project Overview
- This is a Next.js (App Router) project, bootstrapped with `create-next-app`.
- The main app code is in the `app/` directory, following Next.js conventions for routing and layouts.
- Authentication is handled via custom API routes under `app/api/auth/` and React context in `app/lib/auth-context.tsx`.
- UI state and context (e.g., menu) are managed in `app/function/` and `app/lib/`.
- Data for select fields (countries, dates, phones) is stored in `app/data/` as TypeScript modules.
- User data is mocked in `data/users.json`.

## Key Patterns & Conventions
- **Routing:** Each subfolder in `app/` (e.g., `orders/`, `products/`, `profile/`) represents a route. Use `page.tsx` for route entry points.
- **API:** All backend logic is in `app/api/` using Next.js API routes. Auth endpoints are in `app/api/auth/`.
- **Auth:** Use the `useAuth`, `useRequireAuth`, and `useAuthRedirect` hooks for authentication-aware components. See `app/hooks/` and `app/lib/auth-context.tsx`.
- **Components:** Shared UI logic/components are in `app/function/` and `app/Navbar/`.
- **Styling:** Uses Tailwind CSS (see `app/globals.css`).
- **Types:** User types are defined in `app/types/user.ts`.
- **Imports:** Use absolute imports with `@/app/...` for internal modules.

## Developer Workflows
- **Dev server:** `npm run dev` (Next.js dev mode)
- **Build:** `npm run build` (Next.js production build)
- **Start:** `npm run start` (serve production build)
- **Lint:** `npm run lint` (uses ESLint with Next.js config)
- **No test scripts or test files are present.**

## Integration & Data Flow
- **Auth tokens** are managed via JWT in middleware (`app/middleware.ts`) and API routes.
- **User context** is provided via React context (`app/lib/auth-context.tsx`).
- **API routes** communicate with mock data (`data/users.json`).
- **No external database or persistent backend**—all data is local or in-memory.

## Examples
- To add a new protected page, create a folder in `app/`, add `page.tsx`, and use `useRequireAuth`.
- To add a new API endpoint, add a folder under `app/api/` and implement `route.ts`.

## References
- Main entry: `app/page.tsx`
- Auth context: `app/lib/auth-context.tsx`
- Middleware: `app/middleware.ts`
- Example API: `app/api/auth/signin/route.ts`
- Example protected page: `app/wishlist/page.tsx`

---

Update this file if you introduce new architectural patterns, workflows, or conventions.