# Category Management — Shape

## Scope

Full CRUD for categories at `/categories`. No schema changes — Category model already exists.

## Data Layer

No new models. Queries use existing Category model:
- List: `findMany` with `_count.expenses` (non-deleted only)
- Create/Update: server actions with Zod validation, P2002 unique constraint handling
- Delete: check active expense count, reject if > 0, soft delete

## Frontend Changes

- `src/components/color-picker.tsx` — Reusable preset grid + hex input
- `src/features/categories/` — Full feature module mirroring expenses pattern
- `src/app/(dashboard)/categories/page.tsx` — Server Component

## Dependencies

- Phase 1a (existing Category model + expenses feature pattern)
