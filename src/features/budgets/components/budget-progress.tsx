'use client'

import { cn } from '@/lib/utils'

type BudgetProgressProps = {
  spent: number
  limit: number
  className?: string
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export function BudgetProgress({ spent, limit, className }: BudgetProgressProps) {
  const percentage = limit > 0 ? Math.round((spent / limit) * 100) : 0
  const displayWidth = Math.min(percentage, 100)

  const barColor =
    percentage >= 90
      ? 'bg-red-500'
      : percentage >= 75
        ? 'bg-yellow-500'
        : 'bg-green-500'

  return (
    <div className={cn('space-y-1', className)}>
      <div className='flex justify-between text-sm'>
        <span className='text-muted-foreground'>
          {formatCurrency(spent)} of {formatCurrency(limit)}
        </span>
        <span className={cn(
          'font-medium',
          percentage >= 90 ? 'text-red-500' : percentage >= 75 ? 'text-yellow-500' : 'text-muted-foreground'
        )}>
          {percentage}%
        </span>
      </div>
      <div className='h-2 w-full rounded-full bg-secondary'>
        <div
          className={cn('h-full rounded-full transition-all', barColor)}
          style={{ width: `${displayWidth}%` }}
        />
      </div>
    </div>
  )
}
