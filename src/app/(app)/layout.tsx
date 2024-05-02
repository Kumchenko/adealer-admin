import Sidebar from '@/components/Sidebar/Sidebar'
import { REFRESH_TOKEN_KEY } from '@/constants/Authorization'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  const cookieStore = cookies()
  const token = cookieStore.get(REFRESH_TOKEN_KEY)?.value

  if (!token) redirect('/login')

  return (
    <div className="lg:flex">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  )
}

export default Layout
