# Recurring Expenses — Spec

## Context

Phase 2c. Users manually create the same expenses monthly (Netflix, rent, gym). This adds recurring expense templates that auto-create expense entries on dashboard load. Frequencies: monthly and yearly.

## Tasks

- [x] T-1: Save spec documentation
- [x] T-2: Prisma schema migration (RecurringExpense model)
- [x] T-3: Feature module schema + server actions
- [ ] T-4: Auto-create logic + dashboard integration
- [ ] T-5: Recurring expenses UI (page, table, dialogs, sidebar link)

## What Will Be Built

- **Model:** RecurringExpense (amount, description, category, frequency, startDate, nextDueDate, isActive)
- **Server Actions:** createRecurringExpense, updateRecurringExpense, deleteRecurringExpense, toggleRecurringExpense
- **Auto-Create:** processRecurringExpenses function (lazy, on dashboard load)
- **Pages:** /recurring with data table
- **Components:** RecurringTable, RecurringActionDialog, RecurringDeleteDialog, RecurringProvider

## Acceptance Criteria

- Can create recurring expense with amount, description, category, frequency (monthly/yearly), start date
- Dashboard load auto-creates expenses for all due recurring entries
- Multiple missed periods auto-created (backfill)
- No duplicate expenses on multiple dashboard loads (idempotent)
- Can pause/resume recurring expenses
- Can edit and soft-delete recurring expenses
- Category delete blocked if active recurring expenses exist
- Sidebar shows Recurring nav link
