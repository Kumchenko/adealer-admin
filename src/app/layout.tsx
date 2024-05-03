import '../styles/globals.css'
import { Raleway } from 'next/font/google'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Metadata } from 'next/types'
import { Providers } from '@/providers'
import Modal from '@/components/Modal/Modal'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Page',
    template: '%s | ADealer Admin',
    absolute: 'ADealer Admin',
  },
  description: 'AppleDealer managing system for handling orders and calls',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="bg-violet-50" lang="en">
      <body
        className={cn(
          raleway.className,
          'min-h-screen bg-light-gradient bg-cover bg-no-repeat lining-nums text-violet-800',
        )}
      >
        <Providers>
          <Header />
          <div className={cn('border-violet-400', { ['border-b border-t']: !!children })}>{children}</div>
          <Toaster richColors theme="light" />
          <Footer />
          <Modal />
        </Providers>
      </body>
    </html>
  )
}
