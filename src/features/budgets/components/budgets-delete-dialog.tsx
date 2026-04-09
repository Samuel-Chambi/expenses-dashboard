'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type BudgetWithSpending } from '../schema'
import { deleteBudget } from '../actions'

type BudgetsDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: BudgetWithSpending
}

export function BudgetsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: BudgetsDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const name = currentRow.category?.name ?? 'Overall Monthly Budget'

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteBudget(currentRow.id)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success('Budget removed')
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Remove Budget'
      desc={`Are you sure you want to remove the budget for "${name}"?`}
      confirmText='Remove'
      destructive
      handleConfirm={handleDelete}
      isLoading={isLoading}
    />
  )
}
