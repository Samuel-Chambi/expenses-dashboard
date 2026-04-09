import { cn } from '@/lib/utils'

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
}

export function Main({ className, fixed, ...props }: MainProps) {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-0',
        fixed && 'flex flex-col flex-grow overflow-hidden',
        className
      )}
      {...props}
    />
  )
}
