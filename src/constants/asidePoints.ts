import { Endpoint } from '@/interfaces'
import { EEmployeeRole } from 'adealer-types'

export const asidePoints: Endpoint[] = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    roles: [EEmployeeRole.ADMIN],
  },
  {
    href: '/orders',
    title: 'Orders',
  },
  {
    href: '/calls',
    title: 'Calls',
  },
  {
    href: '/employees',
    title: 'Employees',
    roles: [EEmployeeRole.ADMIN],
  },
  {
    href: '/audit',
    title: 'Audit',
    roles: [EEmployeeRole.ADMIN],
  },
  {
    href: '/logout',
    title: 'Logout',
  },
]
