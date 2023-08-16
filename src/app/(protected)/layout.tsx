import Sidebar from '@/components/Sidebar/Sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    const cookieStore = cookies()
    const token = cookieStore.get('logged_in')
    console.log(`Token: ${token} Check value: ${!token}`)
    if (!token) {
        // redirect('/logout')
    }
    return (
        <div className="lg:flex">
            <Sidebar />
            <main className="w-full">{children}</main>
        </div>
    )
}

export default Layout
