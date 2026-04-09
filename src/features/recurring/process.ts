import { addMonths, addYears } from 'date-fns'
import { db } from '@/lib/db'

export async function processRecurringExpenses(userId: string) {
  const now = new Date()

  const dueRecurrences = await db.recurringExpense.findMany({
    where: {
      userId,
      isActive: true,
      deletedAt: null,
      nextDueDate: { lte: now },
    },
  })

  for (const rec of dueRecurrences) {
    const advanceFn = rec.frequency === 'monthly' ? addMonths : addYears
    let nextDue = new Date(rec.nextDueDate)
    const expensesToCreate: {
      amount: typeof rec.amount
      description: string
      categoryId: string
      userId: string
      date: Date
    }[] = []

    const MAX_BACKFILL = 120
    let iterations = 0

    while (nextDue <= now && iterations < MAX_BACKFILL) {
      expensesToCreate.push({
        amount: rec.amount,
        description: rec.description,
        categoryId: rec.categoryId,
        userId,
        date: new Date(nextDue),
      })
      nextDue = advanceFn(nextDue, 1)
      iterations++
    }

    if (expensesToCreate.length > 0) {
      await db.$transaction(async (tx) => {
        // Optimistic lock: only advance if nextDueDate hasn't changed
        const updated = await tx.recurringExpense.updateMany({
          where: {
            id: rec.id,
            nextDueDate: rec.nextDueDate,
          },
          data: { nextDueDate: nextDue },
        })

        // Only create expenses if we successfully claimed this recurring
        if (updated.count > 0) {
          await tx.expense.createMany({ data: expensesToCreate })
        }
      })
    }
  }
}
