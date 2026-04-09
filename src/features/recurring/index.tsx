'use client'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { type RecurringExpense, type Category } from './schema'
import { RecurringDialogs } from './components/recurring-dialogs'
import { RecurringPrimaryButtons } from './components/recurring-primary-buttons'
import { RecurringProvider } from './components/recurring-provider'
import { RecurringTable } from './components/recurring-table'

type RecurringPageProps = {
  recurringExpenses: RecurringExpense[]
  categories: Category[]
}

export function RecurringPage({ recurringExpenses, categories }: RecurringPageProps) {
  return (
    <RecurringProvider categories={categories}>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Recurring Expenses</h1>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Recurring List</h2>
            <p className='text-muted-foreground'>
              Manage your recurring expenses and subscriptions.
            </p>
          </div>
          <RecurringPrimaryButtons />
        </div>
        <RecurringTable data={recurringExpenses} categories={categories} />
      </Main>

      <RecurringDialogs />
    </RecurringProvider>
  )
}
