import React from 'react'
import { CardProps } from './interfaces'

const Card = ({ className, children }: CardProps) => {
    return (
        <div
            className={`${className} overflow-hidden rounded-3xl bg-violet-white`}
        >
            {children}
        </div>
    )
}

export default Card
