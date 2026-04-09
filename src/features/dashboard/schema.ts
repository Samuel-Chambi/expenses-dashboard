export type DateRange = {
  from: Date
  to: Date
}

export type SummaryStats = {
  totalSpent: number
  expenseCount: number
  averageExpense: number
  topCategory: { name: string; total: number } | null
}

export type CategoryBreakdownItem = {
  name: string
  color: string
  total: number
}

export type MonthlyTrendItem = {
  month: string
  total: number
}

export type RecentExpense = {
  id: string
  amount: number
  description: string
  date: Date
  category: {
    name: string
    color: string | null
  }
}
