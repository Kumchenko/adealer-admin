'use client'
import { memo, useContext, useEffect } from 'react'
import { SidebarProps } from './interfaces'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import SidebarContext from './SidebarContext'
import SidebarList from './SidebarList'
import { usePathname } from 'next/navigation'

const Sidebar = ({ className }: SidebarProps) => {
    const pathname = usePathname()
    const { open, setOpen } = useContext(SidebarContext)

    useEffect(() => {
        setOpen && setOpen(false)
    }, [pathname])

    return (
        <aside
            className={`
                ${className}
                ${
                    open &&
                    'max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-20 max-lg:h-screen max-lg:w-screen max-lg:p-5'
                }
                max-w-full overflow-hidden border-violet-400 bg-violet-50 px-4 py-2
                shadow max-lg:border-b lg:w-1/4 lg:border-r lg:py-4
            `}
        >
            <Breadcrumb />
            <SidebarList />
        </aside>
    )
}

export default memo(Sidebar)
