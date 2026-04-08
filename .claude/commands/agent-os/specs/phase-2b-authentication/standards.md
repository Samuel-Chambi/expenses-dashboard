# Authentication — Applicable Standards

## global/project-structure
Feature-based layout. Auth feature in src/features/auth/. Auth pages in src/app/(auth)/.

## api/server-actions
Server Actions for auth mutations (signUp, signIn). Zod validation on form data.

## database/prisma
Singleton client. Soft deletes on existing models. New User + Account models. userId FK on Expense + Category.

## frontend/ui-components
shadcn/ui, Tailwind, react-hook-form + Zod, Lucide icons, Sonner toasts.
