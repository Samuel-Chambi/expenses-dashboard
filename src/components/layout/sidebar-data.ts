import {
  LayoutDashboard,
  Receipt,
  Repeat,
  Tags,
  Wallet,
  Settings,
} from 'lucide-react'
import { type SidebarData } from './types'

export const sidebarData: SidebarData = {
  user: {
    name: 'User',
    email: 'user@example.com',
    avatar: '',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Expenses',
          url: '/expenses',
          icon: Receipt,
        },
        {
          title: 'Categories',
          url: '/categories',
          icon: Tags,
        },
        {
          title: 'Recurring',
          url: '/recurring',
          icon: Repeat,
        },
        {
          title: 'Budgets',
          url: '/budgets',
          icon: Wallet,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
