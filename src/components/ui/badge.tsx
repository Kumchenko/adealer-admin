import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300',
  {
    variants: {
      variant: {
        info: 'border-indigo-500 bg-indigo-100 text-indigo-500 hover:bg-indigo-100/80',
        success: 'border-green-500 bg-green-100 text-green-500 hover:bg-green-100/80',
        warning: 'border-yellow-500 bg-yellow-100 text-yellow-500 hover:bg-yellow-100/80',
        destructive: 'border-red-600 bg-red-100 text-red-600 hover:bg-red-100/80',
        secondary:
          'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        outline: 'text-slate-950 dark:text-slate-50',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
