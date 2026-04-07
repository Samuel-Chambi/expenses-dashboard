# Server Actions & API Routes

## Default: Server Actions

Use Next.js Server Actions for all data mutations.

```ts
// features/{name}/actions.ts
'use server'

export async function createExpense(data: FormData) {
  const parsed = expenseSchema.parse(Object.fromEntries(data))
  return prisma.expense.create({ data: parsed })
}
```

## Rules

- Server Actions live in `features/{name}/actions.ts`
- Always validate input with Zod before database operations
- API routes (`app/api/`) only for: webhooks, external API integrations, cron jobs
- Data fetching: use Server Components with direct Prisma queries
- Never expose Prisma client to client components

## Error Handling

- Catch Zod validation errors, return user-friendly messages
- Catch Prisma errors, log server-side, return generic message to client
