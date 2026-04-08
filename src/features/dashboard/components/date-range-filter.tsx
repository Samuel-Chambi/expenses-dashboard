'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange as DayPickerRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { DateRange } from '../schema'

type DateRangeFilterProps = {
  dateRange: DateRange
}

const presets = [
  { label: 'This Month', getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { label: 'Last Month', getRange: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: 'Last 3 Months', getRange: () => ({ from: startOfMonth(subMonths(new Date(), 2)), to: endOfMonth(new Date()) }) },
  { label: 'Last 6 Months', getRange: () => ({ from: startOfMonth(subMonths(new Date(), 5)), to: endOfMonth(new Date()) }) },
  { label: 'This Year', getRange: () => ({ from: startOfYear(new Date()), to: endOfYear(new Date()) }) },
]

export function DateRangeFilter({ dateRange }: DateRangeFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [range, setRange] = useState<DayPickerRange | undefined>({
    from: dateRange.from,
    to: dateRange.to,
  })

  const applyRange = (from: Date, to: Date) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('from', format(from, 'yyyy-MM-dd'))
    params.set('to', format(to, 'yyyy-MM-dd'))
    router.push(`/?${params.toString()}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn(
            'h-8 justify-start text-left font-normal',
            !range && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, 'MMM d, yyyy')} – {format(range.to, 'MMM d, yyyy')}
              </>
            ) : (
              format(range.from, 'MMM d, yyyy')
            )
          ) : (
            'Pick a date range'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <div className='flex'>
          <div className='flex flex-col gap-1 border-r p-3'>
            {presets.map((preset) => (
              <Button
                key={preset.label}
                variant='ghost'
                size='sm'
                className='justify-start text-xs'
                onClick={() => {
                  const r = preset.getRange()
                  setRange(r)
                  applyRange(r.from, r.to)
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <div>
            <Calendar
              mode='range'
              selected={range}
              onSelect={(newRange) => {
                setRange(newRange)
                if (newRange?.from && newRange?.to) {
                  applyRange(newRange.from, newRange.to)
                }
              }}
              numberOfMonths={2}
              initialFocus
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
