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

    while (nextDue <= now) {
      expensesToCreate.push({
        amount: rec.amount,
        description: rec.description,
        categoryId: rec.categoryId,
        userId,
        date: new Date(nextDue),
      })
      nextDue = advanceFn(nextDue, 1)
    }

    if (expensesToCreate.length > 0) {
      // Use updateMany with nextDueDate condition as optimistic lock
      // If another request already advanced nextDueDate, count will be 0 and we skip
      const updated = await db.recurringExpense.updateMany({
        where: {
          id: rec.id,
          nextDueDate: rec.nextDueDate, // optimistic lock
        },
        data: { nextDueDate: nextDue },
      })

      // Only create expenses if we successfully claimed this recurring
      if (updated.count > 0) {
        await db.expense.createMany({ data: expensesToCreate })
      }
    }
  }
}
