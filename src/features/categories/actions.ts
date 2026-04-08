'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { categoryFormSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function createCategory(data: unknown): Promise<ActionResult> {
  const parsed = categoryFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const userId = await getCurrentUserId()

  try {
    await db.category.create({ data: { ...parsed.data, userId } })
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
      return { success: false, error: 'A category with this name already exists' }
    }
    throw e
  }

  revalidatePath('/categories')
  return { success: true }
}

export async function updateCategory(id: string, data: unknown): Promise<ActionResult> {
  const parsed = categoryFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const userId = await getCurrentUserId()

  try {
    await db.category.update({ where: { id, userId }, data: parsed.data })
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
      return { success: false, error: 'A category with this name already exists' }
    }
    throw e
  }

  revalidatePath('/categories')
  return { success: true }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const userId = await getCurrentUserId()

  const count = await db.expense.count({
    where: { categoryId: id, userId, deletedAt: null },
  })

  if (count > 0) {
    return { success: false, error: `Cannot delete: ${count} active expense(s) use this category` }
  }

  try {
    await db.category.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    })
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'code' in e && e.code === 'P2025') {
      return { success: false, error: 'Category not found' }
    }
    throw e
  }

  revalidatePath('/categories')
  revalidatePath('/expenses')
  return { success: true }
}
