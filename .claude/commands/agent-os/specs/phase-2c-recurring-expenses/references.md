# Recurring Expenses — References

## Expenses Feature (primary pattern)
- **Location:** src/features/expenses/
- **Key patterns:** CRUD actions with ActionResult, provider context, data table, form dialog

## Categories Feature (secondary pattern)
- **Location:** src/features/categories/
- **Key patterns:** updateMany for ownership, deleteCategory with relation check

## Dashboard (auto-create integration point)
- **Location:** src/app/(dashboard)/page.tsx
- **Key pattern:** Server Component calling processRecurringExpenses before data fetch

## Files to Modify
- prisma/schema.prisma — add RecurringExpense model + relations
- src/app/(dashboard)/page.tsx — call processRecurringExpenses
- src/components/layout/sidebar-data.ts — add Recurring nav link
- src/features/categories/actions.ts — check recurring in deleteCategory
