import { ButtonProps } from './interfaces'
import { forwardRef, memo } from 'react'
import { useRouter } from 'next/navigation'
import { DesignColor } from '@/constants'
import Spinner from '../Spinner/Spinner'

const colorVariants = {
    [DesignColor.Green]: 'bg-green text-green-white hover:bg-green-light active:bg-green-dark',
    [DesignColor.Red]: 'bg-red text-red-white hover:bg-red-light active:bg-red-dark',
    [DesignColor.Violet]: 'bg-violet text-violet-white hover:bg-violet-light active:bg-violet-dark',
    [DesignColor.Transparent]: 'bg-transparent text-current',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, type, disabled, children, onClick, href, target, color, isLoading }, ref) => {
        const router = useRouter()

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(e)
            }
            if (href) {
                if (href.startsWith('.') || href.startsWith('/')) {
                    router.push(href)
                } else {
                    window.open(href, target)
                }
            }
        }
        return (
            <button
                ref={ref}
                className={`
                block
                    rounded-2xl px-3 py-2 disabled:cursor-not-allowed disabled:bg-neutral
                    ${colorVariants[color]} ${className}
                `}
                type={type}
                disabled={disabled}
                onClick={handleClick}
            >
                {isLoading ? <Spinner className="h-6" /> : children}
            </button>
        )
    },
)
Button.displayName = 'Button'

export default memo(Button)
