import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import SidebarItem from '../Sidebar/SidebarItem'
import { BreadcrumbListProps } from './interfaces'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Fragment, useMemo } from 'react'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const BreadcrumbList = ({ endpoints, className }: BreadcrumbListProps) => {
  const segments = useSelectedLayoutSegments()
  const links = useMemo(() => {
    let links: string[] = []
    links.push(
      segments.reduce((accumulator, segment) => {
        accumulator ? links.push(accumulator) : null
        return accumulator + '/' + segment
      }, ''),
    )
    return links
  }, [segments])

  return (
    <ul className={`${className} flex items-center gap-1 [&>*]:shrink-[0]`}>
      <SidebarItem href="/" key="home" title={<HomeIcon className="h-5 w-5" />} />
      {segments.map((segment, index) => (
        <Fragment key={segment}>
          <ChevronRightIcon className="h-5 w-5" />
          <SidebarItem
            title={endpoints.find(({ href }) => href === links[index])?.title || capitalizeFirstLetter(segment)}
            href={links[index]}
          />
        </Fragment>
      ))}
    </ul>
  )
}

export default BreadcrumbList
