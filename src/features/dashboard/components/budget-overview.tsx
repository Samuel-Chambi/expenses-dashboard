'use client'

import Link from 'next/link'
import { Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BudgetProgress } from '@/features/budgets/components/budget-progress'
import type { BudgetOverview as BudgetOverviewType } from '../schema'

type BudgetOverviewProps = {
  data: BudgetOverviewType
}

export function BudgetOverview({ data }: BudgetOverviewProps) {
  if (!data) {
    return (
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Monthly Budget</CardTitle>
          <Wallet className='size-4 text-muted-foreground' />
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-3 py-4'>
          <p className='text-sm text-muted-foreground'>No budget set</p>
          <Button variant='outline' size='sm' asChild>
            <Link href='/budgets'>Set a budget</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Monthly Budget</CardTitle>
        <Wallet className='size-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <BudgetProgress spent={data.spent} limit={data.amount} />
      </CardContent>
    </Card>
  )
}
