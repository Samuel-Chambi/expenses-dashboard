'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type RecurringExpense } from '../schema'
import { deleteRecurringExpense } from '../actions'

type RecurringDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: RecurringExpense
}

export function RecurringDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: RecurringDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currentRow.amount)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteRecurringExpense(currentRow.id)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success('Recurring expense deleted')
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Delete Recurring Expense'
      desc={`Are you sure you want to delete "${currentRow.description}" (${formatted} ${currentRow.frequency})? This will not remove already created expenses.`}
      confirmText='Delete'
      destructive
      handleConfirm={handleDelete}
      isLoading={isLoading}
    />
  )
}
