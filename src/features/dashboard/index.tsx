'use client'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import type {
  SummaryStats,
  CategoryBreakdownItem,
  MonthlyTrendItem,
  RecentExpense,
  DateRange,
} from './schema'
import { CategoryChart } from './components/category-chart'
import { DateRangeFilter } from './components/date-range-filter'
import { ExportButtons } from './components/export-buttons'
import { MonthlyChart } from './components/monthly-chart'
import { RecentExpenses } from './components/recent-expenses'
import { SummaryCards } from './components/summary-cards'

type DashboardPageProps = {
  stats: SummaryStats
  categoryBreakdown: CategoryBreakdownItem[]
  monthlyTrend: MonthlyTrendItem[]
  recentExpenses: RecentExpense[]
  dateRange: DateRange
}

export function DashboardPage({
  stats,
  categoryBreakdown,
  monthlyTrend,
  recentExpenses,
  dateRange,
}: DashboardPageProps) {
  return (
    <>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Dashboard</h1>
        <div className='ms-auto flex items-center gap-2'>
          <DateRangeFilter dateRange={dateRange} />
          <ExportButtons dateRange={dateRange} />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6'>
        <SummaryCards stats={stats} />

        <div className='grid gap-4 lg:grid-cols-7'>
          <div className='lg:col-span-4 space-y-4'>
            <MonthlyChart data={monthlyTrend} />
            <CategoryChart data={categoryBreakdown} />
          </div>
          <div className='lg:col-span-3'>
            <RecentExpenses data={recentExpenses} />
          </div>
        </div>
      </Main>
    </>
  )
}
