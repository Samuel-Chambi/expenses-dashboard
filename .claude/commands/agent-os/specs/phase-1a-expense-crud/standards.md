# Expense CRUD — Applicable Standards

## global/project-structure

Feature-based layout. `app/` for routes only, `features/` for business logic, `components/ui/` for shared UI, `lib/` for utilities.

## api/server-actions

Server Actions for all mutations. Actions in `features/{name}/actions.ts` with `'use server'`. Zod validation before DB operations. API routes only for webhooks/external.

## database/prisma

Singleton Prisma client in `lib/db.ts`. All models: id (cuid), createdAt, updatedAt, deletedAt. Soft deletes — filter `deletedAt: null` in queries. Descriptive migration names.

## frontend/ui-components

shadcn/ui components, Tailwind CSS, `cn()` for class merging, no inline styles. Forms: react-hook-form + Zod resolver. Icons: Lucide React. Toasts: Sonner.
