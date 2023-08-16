import { SectionProps } from './interfaces'

const Section = ({ className, children, full = false }: SectionProps) => {
    return (
        <section
            className={`
            ${full ? 'px-2 py-10 sm:py-14 md:py-16' : 'p-6'}
            ${className}
            `}
        >
            {children}
        </section>
    )
}

export default Section
