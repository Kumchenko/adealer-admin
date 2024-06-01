import { useSidebarContext } from './SidebarContext'
import SidebarItem from './SidebarItem'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useMyEmployee } from '@/api/queries/Employee/queries'
import { EEmployeeRole } from 'adealer-types'

const SidebarList = () => {
  const pathname = usePathname()

  const { data: employee } = useMyEmployee()

  const { open, endpoints } = useSidebarContext()

  return (
    <nav className={`${!open && 'max-lg:h-0'}`}>
      <ul className={cn('flex flex-col gap-y-1', { ['max-lg:invisible max-lg:opacity-0']: !open })}>
        {endpoints.map(({ href, title, roles }) =>
          !roles?.length || (!!employee && roles?.includes(employee.role as EEmployeeRole)) ? (
            <SidebarItem className="max-lg:text-xl" key={href} active={pathname === href} href={href} title={title} />
          ) : null,
        )}
      </ul>
    </nav>
  )
}

export default SidebarList
