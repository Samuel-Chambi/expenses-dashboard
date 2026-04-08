# Dashboard & Charts — References

## shadcn-admin Template Dashboard

- **Location:** `D:\RAVN\shadcn-admin-main\src\features\dashboard\`
- **Relevance:** Layout patterns, chart setup, summary card design
- **Key patterns:**
  - 4 stat cards in `sm:grid-cols-2 lg:grid-cols-4`
  - Charts grid: `lg:grid-cols-7` (chart 4 cols, sidebar 3 cols)
  - Recharts BarChart with ResponsiveContainer
  - All mock data — we replace with real Prisma queries

## Existing Expenses Feature

- **Location:** `src/features/expenses/`
- **Relevance:** Server Component data fetching pattern, Decimal serialization
- **Key patterns:**
  - `page.tsx` fetches via `db.expense.findMany`, serializes, passes props
  - Feature module structure: index.tsx + components/ + schema.ts

## Files to Modify

- `src/app/(dashboard)/page.tsx` — replace redirect with dashboard
- `src/app/page.tsx` — remove duplicate redirect
- `src/app/globals.css` — add print media rules
