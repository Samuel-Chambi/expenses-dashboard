'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectDropdown } from '@/components/select-dropdown'
import { type Expense, expenseFormSchema, type ExpenseForm } from '../schema'
import { createExpense, updateExpense } from '../actions'
import { useExpenses } from './expenses-provider'

type ExpensesActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Expense
}

export function ExpensesActionDialog({
  open,
  onOpenChange,
  currentRow,
}: ExpensesActionDialogProps) {
  const isEdit = !!currentRow
  const { categories } = useExpenses()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ExpenseForm>({
    resolver: zodResolver(expenseFormSchema) as never,
    defaultValues: isEdit
      ? {
          amount: currentRow.amount,
          description: currentRow.description,
          date: new Date(currentRow.date),
          categoryId: currentRow.categoryId,
        }
      : {
          amount: 0,
          description: '',
          date: new Date(),
          categoryId: '',
        },
  })

  const onSubmit = async (values: ExpenseForm) => {
    setIsLoading(true)
    try {
      const result = isEdit
        ? await updateExpense(currentRow.id, values)
        : await createExpense(values)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(isEdit ? 'Expense updated' : 'Expense created')
      form.reset()
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  const categoryItems = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the expense details below.'
              : 'Fill in the details to create a new expense.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Grocery shopping' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Pick a date'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select category'
                    items={categoryItems}
                    isControlled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='submit' disabled={isLoading}>
                {isLoading
                  ? 'Saving...'
                  : isEdit
                    ? 'Save Changes'
                    : 'Create Expense'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
