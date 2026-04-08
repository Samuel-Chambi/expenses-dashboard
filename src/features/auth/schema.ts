import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Invalid email'),
  password: z.string().min(1, 'Please enter your password'),
})
export type SignInForm = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().min(1, 'Please enter your email').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
export type SignUpForm = z.infer<typeof signUpSchema>
