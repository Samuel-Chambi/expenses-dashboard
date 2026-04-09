# Category Management — References

## Expenses Feature (primary pattern reference)

- **Location:** `src/features/expenses/`
- **Relevance:** Identical CRUD pattern to follow
- **Key files:**
  - `actions.ts` — server action pattern with ActionResult type
  - `components/expenses-provider.tsx` — context/dialog state pattern
  - `components/expenses-action-dialog.tsx` — form dialog with react-hook-form
  - `components/expenses-table.tsx` — TanStack React Table setup
  - `components/expenses-columns.tsx` — column definitions
  - `components/data-table-row-actions.tsx` — row action dropdown

## Server Component Pattern

- **Location:** `src/app/(dashboard)/expenses/page.tsx`
- **Key pattern:** fetch with Prisma, serialize Decimals, pass props to client
