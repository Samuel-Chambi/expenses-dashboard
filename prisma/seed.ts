import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const categories = [
  { name: 'Food & Dining', color: '#ef4444' },
  { name: 'Transportation', color: '#f97316' },
  { name: 'Entertainment', color: '#eab308' },
  { name: 'Shopping', color: '#22c55e' },
  { name: 'Utilities', color: '#3b82f6' },
  { name: 'Healthcare', color: '#8b5cf6' },
  { name: 'Housing', color: '#ec4899' },
  { name: 'Education', color: '#06b6d4' },
]

const expenseTemplates: Record<string, { descriptions: string[]; minAmount: number; maxAmount: number }> = {
  'Food & Dining': {
    descriptions: [
      'Grocery run at Whole Foods', 'Lunch at Chipotle', 'Coffee at Starbucks',
      'Dinner at Italian restaurant', 'Weekly groceries', 'Takeout Thai food',
      'Breakfast bagels', 'Pizza delivery', 'Sushi dinner', 'Fast food drive-thru',
    ],
    minAmount: 5, maxAmount: 150,
  },
  'Transportation': {
    descriptions: [
      'Uber to airport', 'Monthly bus pass', 'Gas fill-up', 'Parking downtown',
      'Lyft to work', 'Car wash', 'Oil change', 'Toll fees',
    ],
    minAmount: 5, maxAmount: 80,
  },
  'Entertainment': {
    descriptions: [
      'Netflix subscription', 'Movie tickets', 'Concert tickets', 'Spotify premium',
      'Board game night supplies', 'Streaming service', 'Book purchase', 'Video game',
    ],
    minAmount: 10, maxAmount: 100,
  },
  'Shopping': {
    descriptions: [
      'New running shoes', 'Winter jacket', 'Kitchen supplies', 'Home decor',
      'Birthday gift', 'Electronics accessory', 'Office supplies', 'Clothing sale',
    ],
    minAmount: 15, maxAmount: 200,
  },
  'Utilities': {
    descriptions: [
      'Electric bill - monthly', 'Water bill', 'Internet service', 'Phone plan',
      'Gas bill', 'Trash collection', 'Cloud storage subscription',
    ],
    minAmount: 30, maxAmount: 150,
  },
  'Healthcare': {
    descriptions: [
      'Doctor visit copay', 'Prescription medication', 'Dental cleaning',
      'Eye exam', 'Vitamins and supplements', 'Gym membership',
    ],
    minAmount: 15, maxAmount: 300,
  },
  'Housing': {
    descriptions: [
      'Monthly rent', 'Renters insurance', 'Home repair supplies',
      'Cleaning supplies', 'Light bulbs and fixtures', 'Furniture assembly service',
    ],
    minAmount: 20, maxAmount: 1500,
  },
  'Education': {
    descriptions: [
      'Online course - Udemy', 'Programming book', 'Workshop registration',
      'Language learning app', 'Certification exam fee', 'School supplies',
    ],
    minAmount: 10, maxAmount: 200,
  },
}

function randomBetween(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

function randomDate(daysBack: number) {
  const now = new Date()
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()))
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function main() {
  console.log('Seeding test user...')
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    },
  })
  console.log(`  User: ${user.email} (id: ${user.id})`)

  console.log('Seeding categories...')
  const createdCategories = []
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { name_userId: { name: cat.name, userId: user.id } },
      update: {},
      create: { ...cat, userId: user.id },
    })
    createdCategories.push(created)
  }
  console.log(`  Created ${createdCategories.length} categories`)

  console.log('Seeding expenses...')
  const expenses = []
  for (const cat of createdCategories) {
    const template = expenseTemplates[cat.name]
    if (!template) continue

    const count = Math.floor(Math.random() * 8) + 5
    for (let i = 0; i < count; i++) {
      expenses.push({
        amount: randomBetween(template.minAmount, template.maxAmount),
        description: pickRandom(template.descriptions),
        date: randomDate(90),
        categoryId: cat.id,
        userId: user.id,
      })
    }
  }

  await prisma.expense.createMany({ data: expenses })
  console.log(`  Created ${expenses.length} expenses`)

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
