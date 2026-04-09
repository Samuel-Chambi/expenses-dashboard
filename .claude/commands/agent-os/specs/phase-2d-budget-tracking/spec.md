# Budget Tracking — Spec

## Context

Phase 2d. Users have no spending limits. This adds global + per-category monthly budgets with progress bars on a dedicated page and dashboard overview.

## Tasks

- [x] T-1: Save spec documentation
- [x] T-2: Prisma schema migration (Budget model)
- [x] T-3: Schema + actions + queries
- [x] T-4: Budget page UI (progress bars, dialogs)
- [x] T-5: Dashboard integration + sidebar link

## What Will Be Built

- **Model:** Budget (amount, nullable categoryId for global vs per-category, userId)
- **Server Actions:** upsertBudget, deleteBudget
- **Queries:** getBudgetsWithSpending, getGlobalBudgetProgress
- **Pages:** /budgets with card-based list and progress bars
- **Dashboard:** Budget overview card showing global budget progress
- **Components:** BudgetProgress, BudgetsList, BudgetsActionDialog, BudgetsDeleteDialog

## Acceptance Criteria

- Can set global monthly budget
- Can set per-category monthly budgets
- Progress bars: green <75%, yellow 75-90%, red >90%
- Dashboard shows global budget progress (or "Set a budget" prompt)
- Edit and delete budgets
- Category select filters out categories that already have budgets
- Sidebar shows Budgets nav link
