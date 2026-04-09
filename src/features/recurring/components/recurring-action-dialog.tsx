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
import { type RecurringExpense, recurringExpenseFormSchema, type RecurringExpenseForm } from '../schema'
import { createRecurringExpense, updateRecurringExpense } from '../actions'
import { useRecurring } from './recurring-provider'

type RecurringActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: RecurringExpense
}

export function RecurringActionDialog({
  open,
  onOpenChange,
  currentRow,
}: RecurringActionDialogProps) {
  const isEdit = !!currentRow
  const { categories } = useRecurring()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RecurringExpenseForm>({
    resolver: zodResolver(recurringExpenseFormSchema) as never,
    defaultValues: isEdit
      ? {
          amount: currentRow.amount,
          description: currentRow.description,
          categoryId: currentRow.categoryId,
          frequency: currentRow.frequency as 'monthly' | 'yearly',
          startDate: new Date(currentRow.startDate),
        }
      : {
          amount: 0,
          description: '',
          categoryId: '',
          frequency: 'monthly',
          startDate: new Date(),
        },
  })

  const onSubmit = async (values: RecurringExpenseForm) => {
    setIsLoading(true)
    try {
      const result = isEdit
        ? await updateRecurringExpense(currentRow.id, values)
        : await createRecurringExpense(values)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(isEdit ? 'Recurring expense updated' : 'Recurring expense created')
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

  const frequencyItems = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Recurring Expense' : 'Add Recurring Expense'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the recurring expense details.'
              : 'Set up a new recurring expense template.'}
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
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
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
                    <Input placeholder='e.g. Netflix subscription' {...field} />
                  </FormControl>
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

            <FormField
              control={form.control}
              name='frequency'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select frequency'
                    items={frequencyItems}
                    isControlled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='startDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
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

            <DialogFooter>
              <Button type='submit' disabled={isLoading}>
                {isLoading
                  ? 'Saving...'
                  : isEdit
                    ? 'Save Changes'
                    : 'Create Recurring'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
