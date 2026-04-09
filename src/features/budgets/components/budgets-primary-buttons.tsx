'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBudgets } from './budgets-provider'

export function BudgetsPrimaryButtons() {
  const { setOpen } = useBudgets()
  return (
    <Button className='space-x-1' onClick={() => setOpen('add')}>
      <span>Add Budget</span> <Plus size={18} />
    </Button>
  )
}
