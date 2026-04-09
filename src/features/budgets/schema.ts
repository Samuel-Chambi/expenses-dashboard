import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().nullable(),
})
export type Category = z.infer<typeof categorySchema>

export const budgetSchema = z.object({
  id: z.string(),
  amount: z.number(),
  categoryId: z.string().nullable(),
  category: categorySchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Budget = z.infer<typeof budgetSchema>

export const budgetFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  categoryId: z.string().nullable(),
})
export type BudgetForm = z.output<typeof budgetFormSchema>

export type BudgetWithSpending = Budget & {
  spent: number
  percentage: number
}
