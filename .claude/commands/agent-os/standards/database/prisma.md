# Prisma & Database

## Client

Singleton Prisma client in `src/lib/db.ts`.

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Model Conventions

- camelCase for model and field names (Prisma default)
- All models include: `id`, `createdAt`, `updatedAt`, `deletedAt`
- Use `String @id @default(cuid())` for primary keys
- Soft deletes: set `deletedAt` timestamp, never hard delete

```prisma
model Expense {
  id         String    @id @default(cuid())
  amount     Decimal
  category   Category  @relation(fields: [categoryId], references: [id])
  categoryId String
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  deletedAt  DateTime?
}
```

## Rules

- Queries must filter `deletedAt: null` (use Prisma middleware or wrapper)
- Validation schemas (Zod) in `features/{name}/schema.ts`
- Migrations: descriptive names (`npx prisma migrate dev --name add-expense-table`)
