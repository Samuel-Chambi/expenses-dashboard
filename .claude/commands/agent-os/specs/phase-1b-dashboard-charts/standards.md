# Dashboard & Charts — Applicable Standards

## frontend/ui-components

shadcn/ui components, Tailwind CSS, Recharts for charts. `cn()` for class merging, no inline styles. Icons from Lucide React.

## global/project-structure

Feature-based layout. Dashboard feature in `src/features/dashboard/`. Route file in `app/` imports from features, no business logic in route files.

## database/prisma

Singleton Prisma client in `lib/db.ts`. All queries filter `deletedAt: null`. Decimal → Number serialization before passing to client components.
