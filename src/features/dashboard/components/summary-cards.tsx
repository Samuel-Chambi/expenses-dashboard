'use client'

import { DollarSign, Receipt, TrendingUp, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SummaryStats } from '../schema'

type SummaryCardsProps = {
  stats: SummaryStats
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Spent',
      value: formatCurrency(stats.totalSpent),
      icon: DollarSign,
    },
    {
      title: 'Expenses',
      value: stats.expenseCount.toString(),
      icon: Receipt,
    },
    {
      title: 'Average',
      value: formatCurrency(stats.averageExpense),
      icon: TrendingUp,
    },
    {
      title: 'Top Category',
      value: stats.topCategory?.name ?? '—',
      subtitle: stats.topCategory ? formatCurrency(stats.topCategory.total) : undefined,
      icon: Tag,
    },
  ]

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              {card.title}
            </CardTitle>
            <card.icon className='size-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{card.value}</div>
            {card.subtitle && (
              <p className='text-xs text-muted-foreground'>{card.subtitle}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
