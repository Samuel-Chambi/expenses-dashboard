'use client'

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Expense, type Category } from '../schema'

type ExpensesDialogType = 'add' | 'edit' | 'delete'

type ExpensesContextType = {
  open: ExpensesDialogType | null
  setOpen: (str: ExpensesDialogType | null) => void
  currentRow: Expense | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Expense | null>>
  categories: Category[]
}

const ExpensesContext = React.createContext<ExpensesContextType | null>(null)

type ExpensesProviderProps = {
  children: React.ReactNode
  categories: Category[]
}

export function ExpensesProvider({ children, categories }: ExpensesProviderProps) {
  const [open, setOpen] = useDialogState<ExpensesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Expense | null>(null)

  return (
    <ExpensesContext value={{ open, setOpen, currentRow, setCurrentRow, categories }}>
      {children}
    </ExpensesContext>
  )
}

export const useExpenses = () => {
  const context = React.useContext(ExpensesContext)
  if (!context) {
    throw new Error('useExpenses must be used within <ExpensesProvider>')
  }
  return context
}
