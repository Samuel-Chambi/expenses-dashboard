'use client'

import { RecurringActionDialog } from './recurring-action-dialog'
import { RecurringDeleteDialog } from './recurring-delete-dialog'
import { useRecurring } from './recurring-provider'

export function RecurringDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRecurring()

  return (
    <>
      <RecurringActionDialog
        key='recurring-add'
        open={open === 'add'}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <RecurringActionDialog
            key={`recurring-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? 'edit' : null)
              if (!nextOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <RecurringDeleteDialog
            key={`recurring-delete-${currentRow.id}`}
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
