# Recurring Expenses — Shape

## Data Model

### New: RecurringExpense
- id (cuid), amount (Decimal 10,2), description, categoryId (FK), userId (FK)
- frequency ('monthly'|'yearly'), startDate, nextDueDate, isActive (default true)
- createdAt, updatedAt, deletedAt
- Indexes: userId, nextDueDate, deletedAt

### Modified: User + Category
- Add `recurringExpenses RecurringExpense[]` relation

## Auto-Create Logic
- On dashboard page load, before data fetch
- Query active recurring where nextDueDate <= now
- Create expenses for all missed periods (batch createMany)
- Advance nextDueDate past now
- Interactive transaction for idempotency

## Frontend
- src/features/recurring/ — full feature module
- src/app/(dashboard)/recurring/page.tsx — Server Component
- Sidebar: add Recurring link with Repeat icon

## Dependencies
- Phase 2b (Authentication — userId scoping)
