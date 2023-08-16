import { useContext } from 'react'
import SidebarContext from './SidebarContext'
import SidebarItem from './SidebarItem'
import { usePathname } from 'next/navigation'

const SidebarList = () => {
    const pathname = usePathname()
    const { open, endpoints } = useContext(SidebarContext)

    return (
        <nav className={`${!open && 'max-lg:h-0'}`}>
            <ul
                className={`
                        ${!open && 'max-lg:invisible max-lg:opacity-0'}
                        flex flex-col gap-y-1
                    `}
            >
                {endpoints.map(({ href, title }) => (
                    <SidebarItem
                        className="max-lg:text-xl"
                        key={href}
                        active={pathname === href}
                        href={href}
                        title={title}
                    />
                ))}
            </ul>
        </nav>
    )
}

export default SidebarList
