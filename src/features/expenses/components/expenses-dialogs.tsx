'use client'

import { ExpensesActionDialog } from './expenses-action-dialog'
import { ExpensesDeleteDialog } from './expenses-delete-dialog'
import { useExpenses } from './expenses-provider'

export function ExpensesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useExpenses()

  return (
    <>
      <ExpensesActionDialog
        key='expense-add'
        open={open === 'add'}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <ExpensesActionDialog
            key={`expense-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? 'edit' : null)
              if (!nextOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <ExpensesDeleteDialog
            key={`expense-delete-${currentRow.id}`}
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
