import { MouseEventHandler } from 'react'

export type CardProps = React.PropsWithChildren<{
    className?: string
    onClick?: MouseEventHandler<HTMLDivElement>
}>
