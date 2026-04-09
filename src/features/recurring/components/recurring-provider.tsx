'use client'

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type RecurringExpense, type Category } from '../schema'

type RecurringDialogType = 'add' | 'edit' | 'delete'

type RecurringContextType = {
  open: RecurringDialogType | null
  setOpen: (str: RecurringDialogType | null) => void
  currentRow: RecurringExpense | null
  setCurrentRow: React.Dispatch<React.SetStateAction<RecurringExpense | null>>
  categories: Category[]
}

const RecurringContext = React.createContext<RecurringContextType | null>(null)

type RecurringProviderProps = {
  children: React.ReactNode
  categories: Category[]
}

export function RecurringProvider({ children, categories }: RecurringProviderProps) {
  const [open, setOpen] = useDialogState<RecurringDialogType>(null)
  const [currentRow, setCurrentRow] = useState<RecurringExpense | null>(null)

  return (
    <RecurringContext value={{ open, setOpen, currentRow, setCurrentRow, categories }}>
      {children}
    </RecurringContext>
  )
}

export const useRecurring = () => {
  const context = React.useContext(RecurringContext)
  if (!context) {
    throw new Error('useRecurring must be used within <RecurringProvider>')
  }
  return context
}
