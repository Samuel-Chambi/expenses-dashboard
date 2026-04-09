'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebarData } from './sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'

type AppSidebarProps = {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' variant='floating'>
      <SidebarHeader>
        <SidebarMenuButton size='lg' className='pointer-events-none'>
          <div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold'>
            E
          </div>
          <div className='grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate font-semibold'>Expenses</span>
            <span className='truncate text-xs text-muted-foreground'>Dashboard</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
