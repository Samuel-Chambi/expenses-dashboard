'use client'

import { CategoriesActionDialog } from './categories-action-dialog'
import { CategoriesDeleteDialog } from './categories-delete-dialog'
import { useCategories } from './categories-provider'

export function CategoriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategories()

  return (
    <>
      <CategoriesActionDialog
        key='category-add'
        open={open === 'add'}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <CategoriesActionDialog
            key={`category-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? 'edit' : null)
              if (!nextOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <CategoriesDeleteDialog
            key={`category-delete-${currentRow.id}`}
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
