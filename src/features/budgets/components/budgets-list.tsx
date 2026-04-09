'use client'

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type BudgetWithSpending } from '../schema'
import { BudgetProgress } from './budget-progress'
import { useBudgets } from './budgets-provider'

type BudgetsListProps = {
  budgets: BudgetWithSpending[]
}

export function BudgetsList({ budgets }: BudgetsListProps) {
  const { setOpen, setCurrentRow } = useBudgets()

  if (budgets.length === 0) {
    return (
      <Card>
        <CardContent className='flex h-32 items-center justify-center'>
          <p className='text-sm text-muted-foreground'>
            No budgets set. Click "Add Budget" to get started.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Global budget first, then per-category
  const globalBudget = budgets.find((b) => b.categoryId === null)
  const categoryBudgets = budgets.filter((b) => b.categoryId !== null)

  return (
    <div className='space-y-4'>
      {globalBudget && (
        <BudgetCard budget={globalBudget} onEdit={() => { setCurrentRow(globalBudget); setOpen('edit') }} onDelete={() => { setCurrentRow(globalBudget); setOpen('delete') }} />
      )}
      {categoryBudgets.length > 0 && (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categoryBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={() => { setCurrentRow(budget); setOpen('edit') }}
              onDelete={() => { setCurrentRow(budget); setOpen('delete') }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function BudgetCard({
  budget,
  onEdit,
  onDelete,
}: {
  budget: BudgetWithSpending
  onEdit: () => void
  onDelete: () => void
}) {
  const isGlobal = budget.categoryId === null
  const name = isGlobal ? 'Overall Monthly Budget' : budget.category?.name ?? 'Unknown'

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div className='flex items-center gap-2'>
          {!isGlobal && budget.category?.color && (
            <div
              className='size-3 rounded-full'
              style={{ backgroundColor: budget.category.color }}
            />
          )}
          <CardTitle className='text-sm font-medium'>
            {name}
          </CardTitle>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[120px]'>
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className='text-red-500!'>
              <Trash2 className='mr-2 h-4 w-4' />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <BudgetProgress spent={budget.spent} limit={budget.amount} />
      </CardContent>
    </Card>
  )
}
