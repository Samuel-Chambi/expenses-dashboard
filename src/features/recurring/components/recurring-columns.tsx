'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type RecurringExpense } from '../schema'
import { DataTableRowActions } from './data-table-row-actions'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

export const recurringColumns: ColumnDef<RecurringExpense>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate font-medium'>
        {row.getValue('description')}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>
        {formatCurrency(row.getValue('amount'))}
      </div>
    ),
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
    accessorKey: 'frequency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Frequency' />
    ),
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('frequency')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'nextDueDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Next Due' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('nextDueDate'))
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
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Paused'}
        </Badge>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
