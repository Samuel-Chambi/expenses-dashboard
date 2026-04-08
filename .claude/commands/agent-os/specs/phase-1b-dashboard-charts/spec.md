# Dashboard & Charts — Spec

## Context

Phase 1b of MVP. Builds on Phase 1a (Expense CRUD). Adds dashboard with visual charts, date range filtering, and export functionality.

## Tasks

- [x] T-1: Save spec documentation
- [x] T-2: Add shadcn primitives + dashboard data layer (queries + schema)
- [x] T-3: Dashboard page + summary cards
- [x] T-4: Category breakdown chart (pie/donut)
- [x] T-5: Monthly spending trend (bar chart)
- [x] T-6: Recent expenses list
- [ ] T-7: Date range filter (picker + presets + URL params)
- [ ] T-8: Export (CSV + PDF)

## What Will Be Built

- **Queries:** getSummaryStats, getCategoryBreakdown, getMonthlyTrend, getRecentExpenses
- **Server Action:** getExportData (for CSV export)
- **Pages:** `/` dashboard replacing redirect
- **Components:** SummaryCards, CategoryChart, MonthlyChart, RecentExpenses, DateRangeFilter, ExportButtons
- **shadcn additions:** Card, Chart

## Acceptance Criteria

- Dashboard shows 4 summary cards (total spent, count, average, top category)
- Pie/donut chart shows spending by category with colors
- Bar chart shows monthly spending trend
- Recent expenses list shows last 10
- Date range filter with presets updates all dashboard data
- CSV export downloads filtered expenses
- PDF export via browser print with clean layout
- All components handle empty state gracefully
