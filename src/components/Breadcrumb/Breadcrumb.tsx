import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'
import BreadcrumbList from './BreadcrumbList'
import { useContext } from 'react'
import SidebarContext from '../Sidebar/SidebarContext'

const Breadcrumb = () => {
  const { open, setOpen, endpoints } = useContext(SidebarContext)

  return (
    <div className={`flex items-center justify-between gap-2 lg:hidden`}>
      <BreadcrumbList className={`${open && 'hidden'} shrink-[2] overflow-x-auto lg:hidden`} endpoints={endpoints} />
      <button
        className={`${open && 'absolute right-0 top-0 z-30 shrink-0'}`}
        onClick={() => {
          setOpen && setOpen(!open)
        }}
      >
        {open ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-6 w-6" />}
      </button>
    </div>
  )
}

export default Breadcrumb
