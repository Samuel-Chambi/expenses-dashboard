import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { getBudgetsWithSpending } from '@/features/budgets/queries'
import { BudgetsPage } from '@/features/budgets'

export default async function Page() {
  const userId = await getCurrentUserId()

  const [budgets, categories] = await Promise.all([
    getBudgetsWithSpending(userId),
    db.category.findMany({
      where: { deletedAt: null, userId },
      orderBy: { name: 'asc' },
    }),
  ])

  const cats = categories.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
  }))

  return <BudgetsPage budgets={budgets} categories={cats} />
}
