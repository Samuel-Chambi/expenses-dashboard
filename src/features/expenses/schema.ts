import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().nullable(),
})
export type Category = z.infer<typeof categorySchema>

export const expenseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  categoryId: z.string(),
  category: categorySchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Expense = z.infer<typeof expenseSchema>

export const expenseFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  date: z.coerce.date(),
  categoryId: z.string().min(1, 'Category is required'),
})
export type ExpenseForm = z.output<typeof expenseFormSchema>
