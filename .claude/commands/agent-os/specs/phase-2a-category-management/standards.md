# Category Management — Applicable Standards

## global/project-structure
Feature-based layout. Category feature in `src/features/categories/`.

## api/server-actions
Server Actions for mutations. Actions in `features/categories/actions.ts` with `'use server'`. Zod validation before DB operations.

## database/prisma
Singleton Prisma client. Filter `deletedAt: null`. Soft deletes.

## frontend/ui-components
shadcn/ui, Tailwind, `cn()`, react-hook-form + Zod resolver, Lucide icons, Sonner toasts.
