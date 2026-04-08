'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Download, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { DateRange } from '../schema'
import { getExportData } from '../actions'

type ExportButtonsProps = {
  dateRange: DateRange
}

function escapeCsvValue(value: string) {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function ExportButtons({ dateRange }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleCsvExport = async () => {
    setIsExporting(true)
    try {
      const from = format(dateRange.from, 'yyyy-MM-dd')
      const to = format(dateRange.to, 'yyyy-MM-dd')
      const data = await getExportData(from, to)

      if (data.length === 0) {
        toast.error('No expenses to export for this period')
        return
      }

      const headers = ['Date', 'Description', 'Amount', 'Category']
      const rows = data.map((row) => [
        row.date,
        escapeCsvValue(row.description),
        row.amount.toFixed(2),
        escapeCsvValue(row.category),
      ])

      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `expenses-${from}-${to}.csv`
      link.click()
      URL.revokeObjectURL(url)

      toast.success(`Exported ${data.length} expenses`)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePdfExport = () => {
    window.print()
  }

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        size='sm'
        className='h-8'
        onClick={handleCsvExport}
        disabled={isExporting}
      >
        <Download className='mr-2 h-4 w-4' />
        {isExporting ? 'Exporting...' : 'CSV'}
      </Button>
      <Button
        variant='outline'
        size='sm'
        className='h-8'
        onClick={handlePdfExport}
      >
        <FileText className='mr-2 h-4 w-4' />
        PDF
      </Button>
    </div>
  )
}
