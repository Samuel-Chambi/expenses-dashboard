import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function ExpensesPage() {
  return (
    <>
      <Header fixed>
        <h1 className='text-lg font-semibold'>Expenses</h1>
      </Header>
      <Main className='p-4'>
        <p className='text-muted-foreground'>
          Expenses feature coming in the next ticket.
        </p>
      </Main>
    </>
  )
}
