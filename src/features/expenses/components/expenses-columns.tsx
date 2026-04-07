'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Expense } from '../schema'
import { DataTableRowActions } from './data-table-row-actions'

export const expensesColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return (
        <div className='text-nowrap'>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[300px] truncate'>
        {row.getValue('description')}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className='text-right font-medium'>{formatted}</div>
    },
    meta: { className: 'text-right' },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => {
      const category = row.original.category
      return (
        <Badge
          variant='outline'
          className='text-nowrap'
          style={category.color ? { borderColor: category.color, color: category.color } : undefined}
        >
          {category.name}
        </Badge>
      )
    },
    filterFn: (row, _id, value: string[]) => {
      return value.includes(row.original.categoryId)
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
