import { db } from '@/lib/db'
import { getCurrentUserId } from '@/lib/auth-utils'
import { CategoriesPage } from '@/features/categories'

export default async function Page() {
  const userId = await getCurrentUserId()

  const categories = await db.category.findMany({
    where: { deletedAt: null, userId },
    include: {
      _count: {
        select: { expenses: { where: { deletedAt: null } } },
      },
    },
    orderBy: { name: 'asc' },
  })

  const serialized = categories.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    _count: { expenses: c._count.expenses },
  }))

  return <CategoriesPage categories={serialized} />
}
