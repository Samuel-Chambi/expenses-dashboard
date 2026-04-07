# Project Structure

Feature-based layout adapted for Next.js App Router.

## Directory Layout

- `src/app/` — Next.js routes only (page.tsx, layout.tsx, loading.tsx)
- `src/features/` — Business logic grouped by domain (components, hooks, utils per feature)
- `src/components/ui/` — shadcn/ui shared components
- `src/components/layout/` — Shell components (sidebar, header, nav)
- `src/stores/` — Zustand global stores
- `src/hooks/` — Shared custom hooks
- `src/lib/` — Utilities (cn, db client, helpers)
- `src/styles/` — Global CSS and Tailwind theme

## Rules

- Route files in `app/` import from `features/`, never contain business logic
- Feature folders: `features/{name}/components/`, `features/{name}/hooks/`, `features/{name}/utils/`
- Shared across features → `components/`, `hooks/`, `lib/`
- Used by one feature only → stays in that feature folder
