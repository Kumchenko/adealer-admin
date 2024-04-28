import { ButtonProps } from './interfaces'
import { forwardRef, memo } from 'react'
import { useRouter } from 'next/navigation'
import { DesignColor } from '@/constants'
import Spinner from '../Spinner/Spinner'

const colorVariants = {
    [DesignColor.Green]: 'bg-green-500 text-green-50 hover:bg-green-300 active:bg-green-700',
    [DesignColor.Red]: 'bg-red-600 text-red-50 hover:bg-red-400 active:bg-red-700',
    [DesignColor.Violet]: 'bg-violet-800 text-violet-50 hover:bg-violet-400 active:bg-violet-900',
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
                    rounded-2xl px-3 py-2 disabled:cursor-not-allowed disabled:bg-neutral-400
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
