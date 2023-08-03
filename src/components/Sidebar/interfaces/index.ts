import { Endpoint } from '@/interfaces'

export type SidebarProps = {
    className?: string
}
export type SidebarItemProps = {
    href: string
    title: string | JSX.Element
    active?: boolean
    className?: string
}
