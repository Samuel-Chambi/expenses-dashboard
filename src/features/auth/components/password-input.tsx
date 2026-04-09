'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pe-10', className)}
        ref={ref}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute end-0 top-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOff className='size-4 text-muted-foreground' />
        ) : (
          <Eye className='size-4 text-muted-foreground' />
        )}
        <span className='sr-only'>
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
      </Button>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
