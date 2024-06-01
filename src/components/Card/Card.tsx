import { forwardRef, memo } from 'react'
import { CardProps } from './interfaces'
import { cn } from '@/lib/utils'

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, onClick }: CardProps, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn('overflow-hidden rounded-2xl border border-violet-400 bg-violet-50 p-4', className)}
    >
      {children}
    </div>
  )
})
Card.displayName = 'Card'

export default memo(Card)
