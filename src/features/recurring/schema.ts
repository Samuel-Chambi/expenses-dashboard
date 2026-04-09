import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().nullable(),
})
export type Category = z.infer<typeof categorySchema>

export const recurringExpenseSchema = z.object({
  id: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  category: categorySchema,
  frequency: z.string(),
  startDate: z.coerce.date(),
  nextDueDate: z.coerce.date(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type RecurringExpense = z.infer<typeof recurringExpenseSchema>

export const recurringExpenseFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Category is required'),
  frequency: z.enum(['monthly', 'yearly']),
  startDate: z.coerce.date(),
})
export type RecurringExpenseForm = z.output<typeof recurringExpenseFormSchema>
