'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { categoryFormSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function createCategory(data: unknown): Promise<ActionResult> {
  const parsed = categoryFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  try {
    await db.category.create({ data: parsed.data })
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

  try {
    await db.category.update({ where: { id }, data: parsed.data })
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
  const count = await db.expense.count({
    where: { categoryId: id, deletedAt: null },
  })

  if (count > 0) {
    return { success: false, error: `Cannot delete: ${count} active expense(s) use this category` }
  }

  await db.category.update({
    where: { id },
    data: { deletedAt: new Date() },
  })

  revalidatePath('/categories')
  revalidatePath('/expenses')
  return { success: true }
}
