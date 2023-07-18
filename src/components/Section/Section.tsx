import { ISection } from './interfaces'

const Section = ({ className, children }: ISection) => {
    return (
        <section className={`container pt-16 ${className}`}>{children}</section>
    )
}

export default Section
