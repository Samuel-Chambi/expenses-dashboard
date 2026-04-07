# Expense CRUD — References

## Template: shadcn-admin (D:\RAVN\shadcn-admin-main)

### File Mapping

| Template File | Project Equivalent | Key Changes |
|---|---|---|
| `features/users/index.tsx` | `features/expenses/index.tsx` | Props from Server Component |
| `features/users/components/users-provider.tsx` | `features/expenses/components/expenses-provider.tsx` | Dialog types: add/edit/delete |
| `features/users/components/users-action-dialog.tsx` | `features/expenses/components/expenses-action-dialog.tsx` | Expense fields, real server actions |
| `features/users/components/users-delete-dialog.tsx` | `features/expenses/components/expenses-delete-dialog.tsx` | Simpler confirmation, soft delete |
| `features/users/components/users-table.tsx` | `features/expenses/components/expenses-table.tsx` | Local state (no TanStack Router) |
| `features/users/components/users-columns.tsx` | `features/expenses/components/expenses-columns.tsx` | Amount/date/category columns |
| `src/components/layout/` | `src/components/layout/` | Replace TanStack Router → next/link + usePathname |
| `src/components/data-table/` | `src/components/data-table/` | Copy as-is, minor type adjustments |

### Key Patterns to Follow

- Context provider for dialog state + current row
- Zod schema first, infer TypeScript types
- Grid-based form layouts
- TanStack React Table for data table
- Faceted filters for multi-select filtering
- Confirmation dialog for destructive actions
