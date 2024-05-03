'use client'
import { useMyEmployee } from '@/api/queries/Employee/queries'
import { useSelectedLayoutSegment } from 'next/navigation'

const HeaderEmployee = () => {
  const segment = useSelectedLayoutSegment()

  const { data: employee } = useMyEmployee({ enabled: segment === '(app)' })

  if (employee) {
    return (
      <span className="text-lg font-medium sm:text-xl">
        {employee?.login}/{employee?.id}
      </span>
    )
  }

  return null
}

export default HeaderEmployee
