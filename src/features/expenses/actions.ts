'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { expenseFormSchema } from './schema'

export async function createExpense(data: unknown) {
  const parsed = expenseFormSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  await db.expense.create({ data: parsed.data })
  revalidatePath('/expenses')
  return { success: true }
}

export async function updateExpense(id: string, data: unknown) {
  const parsed = expenseFormSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  await db.expense.update({ where: { id }, data: parsed.data })
  revalidatePath('/expenses')
  return { success: true }
}

export async function deleteExpense(id: string) {
  await db.expense.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  revalidatePath('/expenses')
  return { success: true }
}
