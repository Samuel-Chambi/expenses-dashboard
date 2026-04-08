'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Category } from '../schema'
import { DataTableRowActions } from './data-table-row-actions'

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'color',
    header: () => <div className='w-8'>Color</div>,
    cell: ({ row }) => {
      const color = row.getValue('color') as string | null
      return (
        <div
          className='size-5 rounded-full border'
          style={{ backgroundColor: color ?? '#888888' }}
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('name')}</div>
    ),
    enableHiding: false,
  },
  {
    id: 'expenses',
    accessorFn: (row) => row._count.expenses,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expenses' />
    ),
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('expenses')}</div>
    ),
    meta: { className: 'text-right' },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
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
    id: 'actions',
    cell: DataTableRowActions,
  },
]
