'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRecurring } from './recurring-provider'

export function RecurringPrimaryButtons() {
  const { setOpen } = useRecurring()
  return (
    <Button className='space-x-1' onClick={() => setOpen('add')}>
      <span>Add Recurring</span> <Plus size={18} />
    </Button>
  )
}
