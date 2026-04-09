import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { ExpensesPage } from '@/features/expenses'

export default async function Page() {
  const userId = await getCurrentUserId()

  const [expenses, categories] = await Promise.all([
    db.expense.findMany({
      where: { deletedAt: null, userId },
      include: { category: true },
      orderBy: { date: 'desc' },
    }),
    db.category.findMany({
      where: { deletedAt: null, userId },
      orderBy: { name: 'asc' },
    }),
  ])

  const serialized = expenses.map((e) => ({
    ...e,
    amount: Number(e.amount),
    date: e.date,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
    category: {
      id: e.category.id,
      name: e.category.name,
      color: e.category.color,
    },
  }))

  const cats = categories.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
  }))

  return <ExpensesPage expenses={serialized} categories={cats} />
}
