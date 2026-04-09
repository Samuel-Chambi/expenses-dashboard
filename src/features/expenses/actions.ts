'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { expenseFormSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function createExpense(data: unknown): Promise<ActionResult> {
  const parsed = expenseFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const userId = await getCurrentUserId()

  const categoryOwned = await db.category.findFirst({
    where: { id: parsed.data.categoryId, userId },
    select: { id: true },
  })
  if (!categoryOwned) {
    return { success: false, error: 'Invalid category' }
  }

  await db.expense.create({ data: { ...parsed.data, userId } })
  revalidatePath('/expenses')
  return { success: true }
}

export async function updateExpense(id: string, data: unknown): Promise<ActionResult> {
  const parsed = expenseFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const userId = await getCurrentUserId()

  const categoryOwned = await db.category.findFirst({
    where: { id: parsed.data.categoryId, userId },
    select: { id: true },
  })
  if (!categoryOwned) {
    return { success: false, error: 'Invalid category' }
  }

  const result = await db.expense.updateMany({ where: { id, userId }, data: parsed.data })
  if (result.count === 0) {
    return { success: false, error: 'Expense not found' }
  }
  revalidatePath('/expenses')
  return { success: true }
}

export async function deleteExpense(id: string): Promise<ActionResult> {
  const userId = await getCurrentUserId()
  const result = await db.expense.updateMany({
    where: { id, userId },
    data: { deletedAt: new Date() },
  })
  if (result.count === 0) {
    return { success: false, error: 'Expense not found' }
  }
  revalidatePath('/expenses')
  return { success: true }
}
