import '../styles/globals.css'
import { Raleway } from 'next/font/google'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Metadata } from 'next/types'
import { Providers } from '@/providers'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AppleDealer Control',
    description: 'AppleDealer managing system for handling orders and calls.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${raleway.className} 
                    min-h-screen bg-light-gradient bg-cover bg-no-repeat lining-nums text-violet`}
            >
                <Providers>
                    <Header />
                    <div className="border-b border-t border-violet-light">{children}</div>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
