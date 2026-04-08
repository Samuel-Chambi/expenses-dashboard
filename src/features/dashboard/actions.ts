'use server'

import { startOfDay, endOfDay } from 'date-fns'
import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'

export async function getExportData(from: string, to: string) {
  const userId = await getCurrentUserId()
  const expenses = await db.expense.findMany({
    where: {
      deletedAt: null,
      userId,
      date: { gte: startOfDay(new Date(from)), lte: endOfDay(new Date(to)) },
    },
    include: { category: true },
    orderBy: { date: 'desc' },
  })

  return expenses.map((e) => ({
    date: e.date.toISOString().split('T')[0],
    description: e.description,
    amount: Number(e.amount),
    category: e.category.name,
  }))
}
