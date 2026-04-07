import { startOfMonth, format } from 'date-fns'
import { db } from '@/lib/db'
import type {
  DateRange,
  SummaryStats,
  CategoryBreakdownItem,
  MonthlyTrendItem,
  RecentExpense,
} from './schema'

const baseWhere = (range: DateRange) => ({
  deletedAt: null,
  date: { gte: range.from, lte: range.to },
})

export async function getSummaryStats(range: DateRange): Promise<SummaryStats> {
  const where = baseWhere(range)

  const [aggregate, topCategoryGroup] = await Promise.all([
    db.expense.aggregate({
      where,
      _sum: { amount: true },
      _avg: { amount: true },
      _count: true,
    }),
    db.expense.groupBy({
      by: ['categoryId'],
      where,
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 1,
    }),
  ])

  let topCategory: SummaryStats['topCategory'] = null
  if (topCategoryGroup.length > 0) {
    const cat = await db.category.findUnique({
      where: { id: topCategoryGroup[0].categoryId },
    })
    if (cat) {
      topCategory = {
        name: cat.name,
        total: Number(topCategoryGroup[0]._sum.amount ?? 0),
      }
    }
  }

  return {
    totalSpent: Number(aggregate._sum.amount ?? 0),
    expenseCount: aggregate._count,
    averageExpense: Number(aggregate._avg.amount ?? 0),
    topCategory,
  }
}

export async function getCategoryBreakdown(
  range: DateRange
): Promise<CategoryBreakdownItem[]> {
  const groups = await db.expense.groupBy({
    by: ['categoryId'],
    where: baseWhere(range),
    _sum: { amount: true },
    orderBy: { _sum: { amount: 'desc' } },
  })

  if (groups.length === 0) return []

  const categories = await db.category.findMany({
    where: { id: { in: groups.map((g) => g.categoryId) } },
  })

  const catMap = new Map(categories.map((c) => [c.id, c]))

  return groups.map((g) => {
    const cat = catMap.get(g.categoryId)
    return {
      name: cat?.name ?? 'Unknown',
      color: cat?.color ?? '#888888',
      total: Number(g._sum.amount ?? 0),
    }
  })
}

export async function getMonthlyTrend(
  range: DateRange
): Promise<MonthlyTrendItem[]> {
  const expenses = await db.expense.findMany({
    where: baseWhere(range),
    select: { amount: true, date: true },
    orderBy: { date: 'asc' },
  })

  const monthMap = new Map<string, number>()

  for (const exp of expenses) {
    const key = format(startOfMonth(exp.date), 'yyyy-MM')
    monthMap.set(key, (monthMap.get(key) ?? 0) + Number(exp.amount))
  }

  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => ({
      month: format(new Date(key + '-01'), 'MMM'),
      total: Math.round(total * 100) / 100,
    }))
}

export async function getRecentExpenses(
  range: DateRange,
  limit = 10
): Promise<RecentExpense[]> {
  const expenses = await db.expense.findMany({
    where: baseWhere(range),
    include: { category: true },
    orderBy: { date: 'desc' },
    take: limit,
  })

  return expenses.map((e) => ({
    id: e.id,
    amount: Number(e.amount),
    description: e.description,
    date: e.date,
    category: {
      name: e.category.name,
      color: e.category.color,
    },
  }))
}
