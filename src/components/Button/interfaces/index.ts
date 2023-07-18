import { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react'

export type IButton = React.PropsWithChildren<{
    className?: string
    disabled?: boolean
    href?: string
    type?: 'button' | 'submit' | 'reset'
    target?: HTMLAttributeAnchorTarget
    onClick?: MouseEventHandler<HTMLButtonElement>
}>
