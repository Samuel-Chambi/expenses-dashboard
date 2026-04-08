'use server'

import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import { signIn, signOut } from '@/lib/auth'
import { signUpSchema } from './schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function signUpAction(data: unknown): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const { name, email, password } = parsed.data

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    return { success: false, error: 'An account with this email already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      name: name || null,
      email,
      password: hashedPassword,
    },
  })

  try {
    await signIn('credentials', { email, password, redirect: false })
  } catch (e) {
    if (e instanceof AuthError) {
      return { success: false, error: 'Account created but sign-in failed. Please sign in manually.' }
    }
    throw e
  }

  return { success: true }
}

export async function signInWithCredentials(data: {
  email: string
  password: string
}): Promise<ActionResult> {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    return { success: true }
  } catch (e) {
    if (e instanceof AuthError) {
      return { success: false, error: 'Invalid email or password' }
    }
    throw e
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/sign-in' })
}
