import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Spinner from '../Spinner/Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-violet-600 text-violet-50 hover:bg-violet-600/90 dark:bg-violet-50 dark:text-violet-600 dark:hover:bg-violet-50/90',
        success:
          'bg-green-600 text-green-50 hover:bg-green-600/90 dark:bg-green-50 dark:text-green-600 dark:hover:bg-green-50/90',
        destructive:
          'bg-red-600 text-slate-50 hover:bg-red-600/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'border border-violet-200 bg-white hover:bg-violet-100 hover:text-violet-900 dark:border-violet-800 dark:bg-violet-950 dark:hover:bg-violet-800 dark:hover:text-violet-50',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost: 'hover:bg-violet-200/60 hover:text-violet-900 dark:hover:bg-violet-800 dark:hover:text-violet-50',
        link: 'text-violet-900 underline-offset-4 hover:underline dark:text-violet-50',
        icon: '',
      },
      size: {
        default: 'h-10 rounded-2xl px-4 py-2',
        xs: 'h-8 rounded-lg px-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-2xl px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isLoading ? <Spinner className="h-6" /> : children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
