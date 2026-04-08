'use client'

import { useCategories } from './categories-provider'

export function CategoriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategories()

  return (
    <>
      {/* Add/Edit + Delete dialogs — will be wired in T-4 */}
    </>
  )
}
