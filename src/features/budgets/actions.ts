'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { budgetFormSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function upsertBudget(data: unknown): Promise<ActionResult> {
  const parsed = budgetFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const userId = await getCurrentUserId()
  const { amount, categoryId } = parsed.data

  // Verify category ownership if per-category budget
  if (categoryId) {
    const categoryOwned = await db.category.findFirst({
      where: { id: categoryId, userId },
      select: { id: true },
    })
    if (!categoryOwned) {
      return { success: false, error: 'Invalid category' }
    }
  }

  // Handle null categoryId (global) separately since Prisma compound unique with null needs findFirst
  if (categoryId === null) {
    const existing = await db.budget.findFirst({
      where: { userId, categoryId: null },
    })
    if (existing) {
      await db.budget.update({
        where: { id: existing.id },
        data: { amount },
      })
    } else {
      await db.budget.create({
        data: { amount, categoryId: null, userId },
      })
    }
  } else {
    // Per-category: use upsert with compound unique
    await db.budget.upsert({
      where: { userId_categoryId: { userId, categoryId } },
      update: { amount },
      create: { amount, categoryId, userId },
    })
  }

  revalidatePath('/budgets')
  revalidatePath('/')
  return { success: true }
}

export async function deleteBudget(id: string): Promise<ActionResult> {
  const userId = await getCurrentUserId()
  const result = await db.budget.deleteMany({
    where: { id, userId },
  })
  if (result.count === 0) {
    return { success: false, error: 'Budget not found' }
  }
  revalidatePath('/budgets')
  revalidatePath('/')
  return { success: true }
}
