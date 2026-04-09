# Budget Tracking — References

## Existing Feature Patterns
- **Location:** src/features/expenses/, src/features/categories/
- **Key patterns:** CRUD actions, provider context, ActionResult type

## Dashboard Queries
- **Location:** src/features/dashboard/queries.ts
- **Key patterns:** Aggregation queries with date range, Decimal serialization

## Files to Modify
- prisma/schema.prisma — add Budget model + relations
- src/features/dashboard/schema.ts — add BudgetOverview type
- src/features/dashboard/index.tsx — render budget overview
- src/app/(dashboard)/page.tsx — fetch budget data
- src/components/layout/sidebar-data.ts — add nav link
