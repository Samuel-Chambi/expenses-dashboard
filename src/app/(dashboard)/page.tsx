import { startOfMonth, endOfMonth, parseISO, startOfDay, endOfDay } from 'date-fns'
import { getCurrentUserId } from '@/lib/auth-utils'
import { DashboardPage } from '@/features/dashboard'
import {
  getSummaryStats,
  getCategoryBreakdown,
  getMonthlyTrend,
  getRecentExpenses,
} from '@/features/dashboard/queries'
import type { DateRange } from '@/features/dashboard/schema'

type Props = {
  searchParams: Promise<{ from?: string; to?: string }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const now = new Date()

  const dateRange: DateRange = {
    from: params.from ? startOfDay(parseISO(params.from)) : startOfMonth(now),
    to: params.to ? endOfDay(parseISO(params.to)) : endOfMonth(now),
  }

  const userId = await getCurrentUserId()

  const [stats, categoryBreakdown, monthlyTrend, recentExpenses] =
    await Promise.all([
      getSummaryStats(dateRange, userId),
      getCategoryBreakdown(dateRange, userId),
      getMonthlyTrend(dateRange, userId),
      getRecentExpenses(dateRange, userId),
    ])

  return (
    <DashboardPage
      stats={stats}
      categoryBreakdown={categoryBreakdown}
      monthlyTrend={monthlyTrend}
      recentExpenses={recentExpenses}
      dateRange={dateRange}
    />
  )
}
