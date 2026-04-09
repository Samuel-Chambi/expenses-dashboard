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
import { ColorPicker } from '@/components/color-picker'
import { type Category, categoryFormSchema, type CategoryForm } from '../schema'
import { createCategory, updateCategory } from '../actions'

type CategoriesActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Category
}

export function CategoriesActionDialog({
  open,
  onOpenChange,
  currentRow,
}: CategoriesActionDialogProps) {
  const isEdit = !!currentRow
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema) as never,
    defaultValues: isEdit
      ? { name: currentRow.name, color: currentRow.color }
      : { name: '', color: null },
  })

  const onSubmit = async (values: CategoryForm) => {
    setIsLoading(true)
    try {
      const result = isEdit
        ? await updateCategory(currentRow.id, values)
        : await createCategory(values)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(isEdit ? 'Category updated' : 'Category created')
      form.reset()
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the category details below.'
              : 'Create a new expense category.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Food & Dining' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <ColorPicker
                    value={field.value}
                    onChange={field.onChange}
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
                    : 'Create Category'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
