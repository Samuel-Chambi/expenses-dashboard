'use client'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { type Expense, type Category } from './schema'
import { ExpensesDialogs } from './components/expenses-dialogs'
import { ExpensesPrimaryButtons } from './components/expenses-primary-buttons'
import { ExpensesProvider } from './components/expenses-provider'
import { ExpensesTable } from './components/expenses-table'

type ExpensesPageProps = {
  expenses: Expense[]
  categories: Category[]
}

export function ExpensesPage({ expenses, categories }: ExpensesPageProps) {
  return (
    <ExpensesProvider categories={categories}>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Expenses</h1>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Expense List</h2>
            <p className='text-muted-foreground'>
              Track and manage your expenses.
            </p>
          </div>
          <ExpensesPrimaryButtons />
        </div>
        <ExpensesTable data={expenses} categories={categories} />
      </Main>

      <ExpensesDialogs />
    </ExpensesProvider>
  )
}
