'use client'

import { MoreHorizontal, Pencil, Pause, Play, Trash2 } from 'lucide-react'
import { type Row } from '@tanstack/react-table'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type RecurringExpense } from '../schema'
import { toggleRecurringExpense } from '../actions'
import { useRecurring } from './recurring-provider'

type DataTableRowActionsProps = {
  row: Row<RecurringExpense>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useRecurring()
  const isActive = row.original.isActive

  const handleToggle = async () => {
    const result = await toggleRecurringExpense(row.original.id)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success(isActive ? 'Recurring expense paused' : 'Recurring expense resumed')
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('edit')
          }}
        >
          <Pencil className='mr-2 h-4 w-4' />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggle}>
          {isActive ? (
            <>
              <Pause className='mr-2 h-4 w-4' />
              Pause
            </>
          ) : (
            <>
              <Play className='mr-2 h-4 w-4' />
              Resume
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('delete')
          }}
          className='text-red-500!'
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
