'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Expense } from '../schema'
import { deleteExpense } from '../actions'

type ExpensesDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Expense
}

export function ExpensesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ExpensesDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteExpense(currentRow.id)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success('Expense deleted')
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currentRow.amount)

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Delete Expense'
      desc={
        <>
          Are you sure you want to delete{' '}
          <strong>&quot;{currentRow.description}&quot;</strong> ({formatted})?
          This action cannot be undone.
        </>
      }
      confirmText='Delete'
      destructive
      handleConfirm={handleDelete}
      isLoading={isLoading}
    />
  )
}
