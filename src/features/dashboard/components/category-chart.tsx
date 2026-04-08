'use client'

import { Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { CategoryBreakdownItem } from '../schema'

type CategoryChartProps = {
  data: CategoryBreakdownItem[]
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className='flex h-[300px] items-center justify-center'>
          <p className='text-sm text-muted-foreground'>No data for this period</p>
        </CardContent>
      </Card>
    )
  }

  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((item) => [
      item.name,
      { label: item.name, color: item.color },
    ])
  )

  const chartData = data.map((item) => ({
    name: item.name,
    total: item.total,
    fill: item.color,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='mx-auto h-[300px]'>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(value as number)
                  }
                />
              }
            />
            <Pie
              data={chartData}
              dataKey='total'
              nameKey='name'
              innerRadius={60}
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
