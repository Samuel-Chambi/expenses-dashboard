'use server'

import { db } from '@/lib/db'

export async function getExportData(from: string, to: string) {
  const expenses = await db.expense.findMany({
    where: {
      deletedAt: null,
      date: { gte: new Date(from), lte: new Date(to) },
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
