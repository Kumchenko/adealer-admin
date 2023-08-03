const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="flex px-2 py-6 sm:py-8 md:py-10">
            <a
                className="mx-auto"
                href="https://github.com/Kumchenko/appledealer"
                target="_blank"
                rel="noopener noreferrer"
            >
                {currentYear} — Created by Kumchenko
            </a>
        </footer>
    )
}

export default Footer
