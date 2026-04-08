'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Category } from '../schema'
import { deleteCategory } from '../actions'

type CategoriesDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Category
}

export function CategoriesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: CategoriesDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const hasExpenses = currentRow._count.expenses > 0

  const handleDelete = async () => {
    if (hasExpenses) return
    setIsLoading(true)
    try {
      const result = await deleteCategory(currentRow.id)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success('Category deleted')
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Delete Category'
      desc={
        hasExpenses
          ? `"${currentRow.name}" has ${currentRow._count.expenses} active expense(s) and cannot be deleted.`
          : `Are you sure you want to delete "${currentRow.name}"? This action cannot be undone.`
      }
      confirmText='Delete'
      destructive
      handleConfirm={handleDelete}
      isLoading={isLoading}
      disabled={hasExpenses}
    />
  )
}
