'use client'
import { useGetEmployeeQuery } from '@/services/employee'
import { redirect, useSelectedLayoutSegment } from 'next/navigation'

const HeaderEmployee = () => {
    const segment = useSelectedLayoutSegment()
    const { data: employee, isSuccess } = useGetEmployeeQuery(undefined, {
        skip: segment !== '(protected)',
    })

    if (isSuccess) {
        return (
            <span className="text-lg font-medium sm:text-xl">
                {employee?.login}/{employee?.id}
            </span>
        )
    }

    return null
}

export default HeaderEmployee
