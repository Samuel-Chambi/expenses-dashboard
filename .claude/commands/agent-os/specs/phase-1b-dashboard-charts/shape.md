# Dashboard & Charts — Shape

## Scope

Dashboard page at `/` with summary stats, charts, date filtering, and export. Read-only — no data mutations.

## Data Layer

No schema changes. Queries aggregate existing Expense + Category data:
- `getSummaryStats(range)` — aggregate sum/avg/count + groupBy for top category
- `getCategoryBreakdown(range)` — groupBy categoryId with sum, join category names/colors
- `getMonthlyTrend(range)` — fetch expenses, group by month with date-fns
- `getRecentExpenses(range, limit)` — findMany with category include

## Frontend Changes

- `src/app/(dashboard)/page.tsx` — Server Component replacing redirect, reads URL searchParams for date range
- `src/features/dashboard/` — Full feature module
- Charts use Recharts via shadcn `ChartContainer` wrapper
- Date range filter updates URL params → triggers server re-render

## Architecture

- Dashboard is Server Component → fetches data → passes to client components
- Date range via URL searchParams (`from`, `to`) — shareable, works with back/forward
- Export CSV: server action fetches data, client generates file
- Export PDF: `window.print()` with print CSS

## Dependencies

- Phase 1a (Expense CRUD) — uses existing models and db client
- Recharts 3.8.1 (already installed)
- date-fns (already installed)
