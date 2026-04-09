import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { RecurringPage } from '@/features/recurring'

export default async function Page() {
  const userId = await getCurrentUserId()

  const [recurringExpenses, categories] = await Promise.all([
    db.recurringExpense.findMany({
      where: { deletedAt: null, userId },
      include: { category: true },
      orderBy: { nextDueDate: 'asc' },
    }),
    db.category.findMany({
      where: { deletedAt: null, userId },
      orderBy: { name: 'asc' },
    }),
  ])

  const serialized = recurringExpenses.map((r) => ({
    id: r.id,
    amount: Number(r.amount),
    description: r.description,
    categoryId: r.categoryId,
    category: {
      id: r.category.id,
      name: r.category.name,
      color: r.category.color,
    },
    frequency: r.frequency,
    startDate: r.startDate,
    nextDueDate: r.nextDueDate,
    isActive: r.isActive,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  }))

  const cats = categories.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
  }))

  return <RecurringPage recurringExpenses={serialized} categories={cats} />
}
