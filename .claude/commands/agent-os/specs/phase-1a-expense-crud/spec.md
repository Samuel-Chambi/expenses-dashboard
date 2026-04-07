# Expense CRUD — Spec

## Context

Phase 1a of MVP. First feature built on empty codebase. Includes project scaffolding + full expense CRUD. Adapted from shadcn-admin template.

## Tasks

- [x] T-1: Scaffold project (Next.js + Prisma + shadcn/ui + folder structure + layout)
- [x] T-2: Prisma schema + migration (Category + Expense models)
- [ ] T-3: Expense list page (data table with columns, filters, pagination)
- [ ] T-4: Create/Edit expense dialog (form + server actions)
- [ ] T-5: Delete expense (soft delete + confirmation dialog)
- [ ] T-6: Seed data (categories + realistic expenses)

## What Will Be Built

- **Models:** Category, Expense (with soft deletes)
- **Server Actions:** createExpense, updateExpense, deleteExpense
- **Pages:** `/expenses` with data table
- **Components:** ExpensesTable, ExpensesActionDialog, ExpensesDeleteDialog, ExpensesProvider
- **Layout:** Sidebar navigation, header (adapted from template)
- **Data Table:** shared components (column-header, faceted-filter, toolbar, pagination)

## Acceptance Criteria

- Expenses table shows all non-deleted expenses with sorting, filtering, pagination
- Can create expense with amount, description, date, category
- Can edit existing expense
- Can soft-delete expense (sets deletedAt, row disappears from list)
- Seed script populates 8 categories + 50-100 realistic expenses
- App compiles and runs without errors
