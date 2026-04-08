# Authentication — References

## shadcn-admin Template Auth
- **Location:** D:\RAVN\shadcn-admin-main\src\features\auth\
- **Key patterns:** Centered auth layout, react-hook-form + Zod, PasswordInput component, OAuth buttons

## Existing Feature Pattern
- **Location:** src/features/expenses/, src/features/categories/
- **Key pattern:** Server actions with ActionResult type, provider context, form dialogs

## Files to Modify
- prisma/schema.prisma — add User, Account, userId fields
- src/app/(dashboard)/layout.tsx — pass session user to sidebar
- src/app/(dashboard)/page.tsx — add userId to dashboard queries
- src/app/(dashboard)/expenses/page.tsx — filter by userId
- src/app/(dashboard)/categories/page.tsx — filter by userId
- src/features/dashboard/queries.ts — add userId to all functions
- src/features/dashboard/actions.ts — add userId to export
- src/features/expenses/actions.ts — scope CRUD to userId
- src/features/categories/actions.ts — scope CRUD to userId
- src/components/layout/app-sidebar.tsx — accept user prop
- src/components/layout/nav-user.tsx — wire sign-out
- prisma/seed.ts — create test user
