'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { MonthlyTrendItem } from '../schema'

type MonthlyChartProps = {
  data: MonthlyTrendItem[]
}

const chartConfig: ChartConfig = {
  total: {
    label: 'Spending',
    color: 'var(--chart-1)',
  },
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value)

export function MonthlyChart({ data }: MonthlyChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[300px] items-center justify-center'>
          <p className='text-sm text-muted-foreground'>No data for this period</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <BarChart data={data} accessibilityLayer>
            <XAxis dataKey='month' tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(value as number)}
                />
              }
            />
            <Bar
              dataKey='total'
              fill='var(--color-total)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
