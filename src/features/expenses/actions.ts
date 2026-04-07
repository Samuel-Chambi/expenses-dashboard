'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { expenseFormSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function createExpense(data: unknown): Promise<ActionResult> {
  const parsed = expenseFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  await db.expense.create({ data: parsed.data })
  revalidatePath('/expenses')
  return { success: true }
}

export async function updateExpense(id: string, data: unknown): Promise<ActionResult> {
  const parsed = expenseFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  await db.expense.update({ where: { id }, data: parsed.data })
  revalidatePath('/expenses')
  return { success: true }
}

export async function deleteExpense(id: string): Promise<ActionResult> {
  await db.expense.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  revalidatePath('/expenses')
  return { success: true }
}
