import { IButton } from './interfaces'
import { forwardRef } from 'react'
import { useRouter } from 'next/navigation'

const Button = forwardRef<HTMLButtonElement, IButton>(
    ({ className, type, disabled, children, onClick, href, target }, ref) => {
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
                className={`block rounded-2xl px-3 py-2 ${className}`}
                type={type}
                disabled={disabled}
                onClick={handleClick}
            >
                {children}
            </button>
        )
    },
)
Button.displayName = 'Button'

export default Button
