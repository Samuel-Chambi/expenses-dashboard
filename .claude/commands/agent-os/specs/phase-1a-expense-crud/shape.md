# Expense CRUD — Shape

## Data Model

### Category
- id (cuid), name (unique), color (nullable), createdAt, updatedAt, deletedAt

### Expense
- id (cuid), amount (Decimal 10,2), description, date, categoryId (FK), createdAt, updatedAt, deletedAt
- Indexes: categoryId, date, deletedAt

## API Surface (Server Actions)

- `createExpense(data)` — Zod validate → prisma.expense.create → revalidatePath
- `updateExpense(id, data)` — Zod validate → prisma.expense.update → revalidatePath
- `deleteExpense(id)` — set deletedAt → revalidatePath

## Frontend Changes

- `app/(dashboard)/expenses/page.tsx` — Server Component fetches data
- `features/expenses/` — Full feature module (table, dialogs, provider, columns)
- `components/layout/` — Sidebar, header, nav (adapted from shadcn-admin template)
- `components/data-table/` — Reusable table components (from template)

## Dependencies

- None (first feature, empty codebase)
