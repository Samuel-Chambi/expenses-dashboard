export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <div className='flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold'>
            E
          </div>
          <h1 className='ms-2 text-xl font-medium'>Expenses</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
