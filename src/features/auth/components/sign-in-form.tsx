'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema, type SignInForm } from '../schema'
import { signInWithCredentials } from '../actions'
import { PasswordInput } from './password-input'
import { OAuthButtons } from './oauth-buttons'

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema) as never,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SignInForm) => {
    setIsLoading(true)
    try {
      const result = await signInWithCredentials(values)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      router.push('/')
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Sign in
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>

        <OAuthButtons disabled={isLoading} />

        <p className='mt-4 text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' className='underline underline-offset-4 hover:text-primary'>
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  )
}
