'use client'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { type BudgetWithSpending, type Category } from './schema'
import { BudgetsDialogs } from './components/budgets-dialogs'
import { BudgetsList } from './components/budgets-list'
import { BudgetsPrimaryButtons } from './components/budgets-primary-buttons'
import { BudgetsProvider } from './components/budgets-provider'

type BudgetsPageProps = {
  budgets: BudgetWithSpending[]
  categories: Category[]
}

export function BudgetsPage({ budgets, categories }: BudgetsPageProps) {
  // Track which categories already have budgets (plus global marker)
  const existingCategoryIds = budgets
    .map((b) => b.categoryId ?? '__global__')

  return (
    <BudgetsProvider categories={categories} existingCategoryIds={existingCategoryIds}>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Budgets</h1>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Budget Limits</h2>
            <p className='text-muted-foreground'>
              Set monthly spending limits for your categories.
            </p>
          </div>
          <BudgetsPrimaryButtons />
        </div>
        <BudgetsList budgets={budgets} />
      </Main>

      <BudgetsDialogs />
    </BudgetsProvider>
  )
}
