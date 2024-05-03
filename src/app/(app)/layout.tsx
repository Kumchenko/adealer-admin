import Sidebar from '@/components/Sidebar/Sidebar'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-x-hidden lg:flex">
      <Sidebar />
      <main className="grow overflow-x-hidden">{children}</main>
    </div>
  )
}

export default Layout
