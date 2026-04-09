'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type BudgetWithSpending, budgetFormSchema, type BudgetForm } from '../schema'
import { upsertBudget } from '../actions'
import { useBudgets } from './budgets-provider'

type BudgetsActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: BudgetWithSpending
}

export function BudgetsActionDialog({
  open,
  onOpenChange,
  currentRow,
}: BudgetsActionDialogProps) {
  const isEdit = !!currentRow
  const { categories, existingCategoryIds } = useBudgets()
  const [isLoading, setIsLoading] = useState(false)

  // Filter out categories that already have budgets (unless editing that same one)
  const availableCategories = categories.filter(
    (c) => !existingCategoryIds.includes(c.id) || c.id === currentRow?.categoryId
  )

  const form = useForm<BudgetForm>({
    resolver: zodResolver(budgetFormSchema) as never,
    defaultValues: isEdit
      ? {
          amount: currentRow.amount,
          categoryId: currentRow.categoryId,
        }
      : {
          amount: 0,
          categoryId: null,
        },
  })

  const onSubmit = async (values: BudgetForm) => {
    setIsLoading(true)
    try {
      const result = await upsertBudget(values)
      if (!result.success) {
        toast.error(result.error)
        return
      }
      toast.success(isEdit ? 'Budget updated' : 'Budget created')
      form.reset()
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Check if global budget already exists (and we're not editing it)
  const hasGlobalBudget = existingCategoryIds.includes('__global__')
  const showGlobalOption = !hasGlobalBudget || (isEdit && currentRow.categoryId === null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Budget' : 'Add Budget'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the budget amount.'
              : 'Set a monthly spending limit.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={field.value ?? '__global__'}
                    onValueChange={(v) => field.onChange(v === '__global__' ? null : v)}
                    disabled={isEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select budget type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {showGlobalOption && (
                        <SelectItem value='__global__'>Overall Monthly Budget</SelectItem>
                      )}
                      {availableCategories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Limit</FormLabel>
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

            <DialogFooter>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Budget'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
