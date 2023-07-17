import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer
            className='flex pt-10'
        >
            <a
                className='mx-auto'
                href="https://github.com/Kumchenko/appledealer"
                target="_blank"
                rel="noopener noreferrer"
            >
                {currentYear} — Created by Kumchenko
            </a>
        </footer>
    );
}

export default Footer;