import React, { forwardRef } from 'react'
import { CardProps } from './interfaces'

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children }: CardProps, ref) => {
    return (
        <div ref={ref} className={`${className} overflow-hidden rounded-3xl border bg-violet-white`}>
            {children}
        </div>
    )
})

export default Card
