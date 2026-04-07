'use client'

import { ExpensesActionDialog } from './expenses-action-dialog'
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

          {/* Delete dialog — will be implemented in T-5 */}
        </>
      )}
    </>
  )
}
