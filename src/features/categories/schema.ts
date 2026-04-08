import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  _count: z.object({ expenses: z.number() }),
})
export type Category = z.infer<typeof categorySchema>

export const categoryFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  color: z
    .string()
    .trim()
    .nullable()
    .transform((v) => (v === '' ? null : v))
    .refine((v) => v === null || /^#[0-9a-fA-F]{6}$/.test(v), {
      message: 'Invalid color (expected #RRGGBB)',
    }),
})
export type CategoryForm = z.output<typeof categoryFormSchema>
