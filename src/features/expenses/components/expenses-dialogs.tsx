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
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ExpensesActionDialog
            key={`expense-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ExpensesDeleteDialog
            key={`expense-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
