import '../styles/globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AppleDealer Control',
  description: 'AppleDealer managing system for handling orders and calls.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} bg-light-gradient bg-no-repeat bg-cover text-violet-900 lining-nums`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
