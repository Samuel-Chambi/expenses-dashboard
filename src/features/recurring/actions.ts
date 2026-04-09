'use server'

import { addMonths, addYears } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { recurringExpenseFormSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function createRecurringExpense(data: unknown): Promise<ActionResult> {
  const parsed = recurringExpenseFormSchema.safeParse(data)
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

  await db.recurringExpense.create({
    data: {
      ...parsed.data,
      userId,
      nextDueDate: parsed.data.startDate,
    },
  })

  revalidatePath('/recurring')
  return { success: true }
}

export async function updateRecurringExpense(id: string, data: unknown): Promise<ActionResult> {
  const parsed = recurringExpenseFormSchema.safeParse(data)
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

  // Recalculate nextDueDate from new startDate
  const now = new Date()
  let nextDueDate = new Date(parsed.data.startDate)
  const advanceFn = parsed.data.frequency === 'monthly' ? addMonths : addYears
  while (nextDueDate < now) {
    nextDueDate = advanceFn(nextDueDate, 1)
  }

  const result = await db.recurringExpense.updateMany({
    where: { id, userId },
    data: { ...parsed.data, nextDueDate },
  })
  if (result.count === 0) {
    return { success: false, error: 'Recurring expense not found' }
  }

  revalidatePath('/recurring')
  return { success: true }
}

export async function deleteRecurringExpense(id: string): Promise<ActionResult> {
  const userId = await getCurrentUserId()
  const result = await db.recurringExpense.updateMany({
    where: { id, userId },
    data: { deletedAt: new Date() },
  })
  if (result.count === 0) {
    return { success: false, error: 'Recurring expense not found' }
  }
  revalidatePath('/recurring')
  return { success: true }
}

export async function toggleRecurringExpense(id: string): Promise<ActionResult> {
  const userId = await getCurrentUserId()

  const current = await db.recurringExpense.findFirst({
    where: { id, userId, deletedAt: null },
    select: { isActive: true },
  })
  if (!current) {
    return { success: false, error: 'Recurring expense not found' }
  }

  await db.recurringExpense.updateMany({
    where: { id, userId },
    data: { isActive: !current.isActive },
  })

  revalidatePath('/recurring')
  return { success: true }
}
