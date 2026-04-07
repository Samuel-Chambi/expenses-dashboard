'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useExpenses } from './expenses-provider'

export function ExpensesPrimaryButtons() {
  const { setOpen } = useExpenses()
  return (
    <Button className='space-x-1' onClick={() => setOpen('add')}>
      <span>Add Expense</span> <Plus size={18} />
    </Button>
  )
}
