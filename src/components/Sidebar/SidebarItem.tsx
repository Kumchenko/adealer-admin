import Link from 'next/link'
import { memo } from 'react'
import { SidebarItemProps } from './interfaces'

const SidebarItem = ({ href, title, active, className }: SidebarItemProps) => {
    return (
        <li className={`${className} ${active && 'font-semibold'} list-none text-base sm:text-lg`}>
            <Link href={href}>{title}</Link>
        </li>
    )
}

export default memo(SidebarItem)
