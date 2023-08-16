import { DesignColor } from '@/constants'
import { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react'

export type ButtonProps = React.PropsWithChildren<{
    color: DesignColor
    className?: string
    disabled?: boolean
    href?: string
    isLoading?: boolean
    type?: 'button' | 'submit' | 'reset'
    target?: HTMLAttributeAnchorTarget
    onClick?: MouseEventHandler<HTMLButtonElement>
}>
