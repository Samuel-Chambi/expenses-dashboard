import { startOfMonth, endOfMonth } from 'date-fns'
import { db } from '@/lib/db'
import type { BudgetWithSpending } from './schema'

export async function getBudgetsWithSpending(
  userId: string
): Promise<BudgetWithSpending[]> {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const [budgets, categorySpending, totalAggregate] = await Promise.all([
    db.budget.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    }),
    db.expense.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        deletedAt: null,
        date: { gte: monthStart, lte: monthEnd },
      },
      _sum: { amount: true },
    }),
    db.expense.aggregate({
      where: {
        userId,
        deletedAt: null,
        date: { gte: monthStart, lte: monthEnd },
      },
      _sum: { amount: true },
    }),
  ])

  const spendingMap = new Map(
    categorySpending.map((g) => [g.categoryId, Number(g._sum.amount ?? 0)])
  )
  const totalSpent = Number(totalAggregate._sum.amount ?? 0)

  return budgets.map((b) => {
    const amount = Number(b.amount)
    const spent = b.categoryId
      ? spendingMap.get(b.categoryId) ?? 0
      : totalSpent
    const percentage = amount > 0 ? Math.round((spent / amount) * 100) : 0

    return {
      id: b.id,
      amount,
      categoryId: b.categoryId,
      category: b.category
        ? { id: b.category.id, name: b.category.name, color: b.category.color }
        : null,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      spent,
      percentage,
    }
  })
}

export async function getGlobalBudgetProgress(
  userId: string
): Promise<{ amount: number; spent: number; percentage: number } | null> {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const [globalBudget, totalAggregate] = await Promise.all([
    db.budget.findFirst({ where: { userId, categoryId: null }, orderBy: { updatedAt: 'desc' } }),
    db.expense.aggregate({
      where: {
        userId,
        deletedAt: null,
        date: { gte: monthStart, lte: monthEnd },
      },
      _sum: { amount: true },
    }),
  ])

  if (!globalBudget) return null

  const amount = Number(globalBudget.amount)
  const spent = Number(totalAggregate._sum.amount ?? 0)
  const percentage = amount > 0 ? Math.round((spent / amount) * 100) : 0

  return { amount, spent, percentage }
}
