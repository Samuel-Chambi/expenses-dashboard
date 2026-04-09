'use client'

import { BudgetsActionDialog } from './budgets-action-dialog'
import { BudgetsDeleteDialog } from './budgets-delete-dialog'
import { useBudgets } from './budgets-provider'

export function BudgetsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useBudgets()

  return (
    <>
      <BudgetsActionDialog
        key='budget-add'
        open={open === 'add'}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <BudgetsActionDialog
            key={`budget-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? 'edit' : null)
              if (!nextOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <BudgetsDeleteDialog
            key={`budget-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? 'delete' : null)
              if (!nextOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
