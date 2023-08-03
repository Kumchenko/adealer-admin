import { DesignColor } from '@/interfaces'
import { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react'

export type ButtonProps = React.PropsWithChildren<{
    color: DesignColor
    className?: string
    disabled?: boolean
    href?: string
    type?: 'button' | 'submit' | 'reset'
    target?: HTMLAttributeAnchorTarget
    onClick?: MouseEventHandler<HTMLButtonElement>
}>
