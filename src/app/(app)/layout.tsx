'use client'

import { useMyEmployee } from '@/api/queries/Employee/queries'
import Sidebar from '@/components/Sidebar/Sidebar'
import { asidePoints } from '@/constants'
import { EEmployeeRole } from 'adealer-types'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  const { data: employee } = useMyEmployee()

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const matchedEndpoint = asidePoints.find(endpoint => pathname.startsWith(endpoint.href))

    if (
      !!employee?.role &&
      !!matchedEndpoint?.roles?.length &&
      !matchedEndpoint.roles.includes(employee.role as EEmployeeRole)
    ) {
      router.replace('/orders')
    }
  }, [employee?.role, pathname, router])

  return (
    <div className="overflow-x-hidden lg:flex">
      <Sidebar />
      <main className="grow overflow-x-hidden">{children}</main>
    </div>
  )
}

export default Layout
