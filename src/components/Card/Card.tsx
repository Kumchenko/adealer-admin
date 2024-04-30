import { forwardRef, memo } from 'react'
import { CardProps } from './interfaces'

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, onClick }: CardProps, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`${className} overflow-hidden rounded-2xl border border-violet-400 bg-violet-50 p-4`}
    >
      {children}
    </div>
  )
})

export default memo(Card)
