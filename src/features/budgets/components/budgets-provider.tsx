'use client'

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type BudgetWithSpending, type Category } from '../schema'

type BudgetsDialogType = 'add' | 'edit' | 'delete'

type BudgetsContextType = {
  open: BudgetsDialogType | null
  setOpen: (str: BudgetsDialogType | null) => void
  currentRow: BudgetWithSpending | null
  setCurrentRow: React.Dispatch<React.SetStateAction<BudgetWithSpending | null>>
  categories: Category[]
  existingCategoryIds: string[]
}

const BudgetsContext = React.createContext<BudgetsContextType | null>(null)

type BudgetsProviderProps = {
  children: React.ReactNode
  categories: Category[]
  existingCategoryIds: string[]
}

export function BudgetsProvider({ children, categories, existingCategoryIds }: BudgetsProviderProps) {
  const [open, setOpen] = useDialogState<BudgetsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<BudgetWithSpending | null>(null)

  return (
    <BudgetsContext value={{ open, setOpen, currentRow, setCurrentRow, categories, existingCategoryIds }}>
      {children}
    </BudgetsContext>
  )
}

export const useBudgets = () => {
  const context = React.useContext(BudgetsContext)
  if (!context) {
    throw new Error('useBudgets must be used within <BudgetsProvider>')
  }
  return context
}
