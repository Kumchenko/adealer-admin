import Sidebar from '@/components/Sidebar/Sidebar'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="lg:flex">
            <Sidebar />
            <main className="w-full">{children}</main>
        </div>
    )
}

export default Layout
