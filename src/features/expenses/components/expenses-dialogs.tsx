'use client'

import { useExpenses } from './expenses-provider'

export function ExpensesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useExpenses()

  return (
    <>
      {/* Add dialog — will be implemented in T-4 */}

      {currentRow && (
        <>
          {/* Edit dialog — will be implemented in T-4 */}

          {/* Delete dialog — will be implemented in T-5 */}
        </>
      )}
    </>
  )
}
