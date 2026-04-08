'use client'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { type Category } from './schema'
import { CategoriesDialogs } from './components/categories-dialogs'
import { CategoriesPrimaryButtons } from './components/categories-primary-buttons'
import { CategoriesProvider } from './components/categories-provider'
import { CategoriesTable } from './components/categories-table'

type CategoriesPageProps = {
  categories: Category[]
}

export function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <CategoriesProvider>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Categories</h1>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Category List</h2>
            <p className='text-muted-foreground'>
              Manage your expense categories.
            </p>
          </div>
          <CategoriesPrimaryButtons />
        </div>
        <CategoriesTable data={categories} />
      </Main>

      <CategoriesDialogs />
    </CategoriesProvider>
  )
}
