# Budget Tracking — Shape

## Data Model

### New: Budget
- id (cuid), amount (Decimal 10,2), categoryId (nullable — null = global), userId (FK)
- createdAt, updatedAt (no deletedAt — hard delete)
- @@unique([userId, categoryId]), @@index([userId])

### Modified: User + Category
- Add `budgets Budget[]` relation

## Frontend
- src/features/budgets/ — full feature module with card-based list (not data table)
- src/app/(dashboard)/budgets/page.tsx — Server Component
- Dashboard: budget overview card between summary cards and charts
- Sidebar: Budgets link with Wallet icon

## Dependencies
- Phase 2b (Authentication — userId scoping)
- Current month expense data for spending calculations
