'use client'

import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { RecentExpense } from '../schema'

type RecentExpensesProps = {
  data: RecentExpense[]
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export function RecentExpenses({ data }: RecentExpensesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className='text-sm text-muted-foreground text-center py-8'>
            No expenses found
          </p>
        ) : (
          <div className='space-y-4'>
            {data.map((expense) => (
              <div key={expense.id} className='flex items-center gap-3'>
                <div
                  className='size-2.5 shrink-0 rounded-full'
                  style={{ backgroundColor: expense.category.color ?? '#888' }}
                />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium truncate'>
                    {expense.description}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {expense.category.name} · {format(new Date(expense.date), 'MMM d')}
                  </p>
                </div>
                <div className='text-sm font-medium text-right'>
                  {formatCurrency(expense.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
