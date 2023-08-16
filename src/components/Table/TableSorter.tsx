import { Sort } from '@/constants'
import { capitalizeFirstLetter } from '@/utils'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useFormikContext } from 'formik'
import { MouseEvent } from 'react'
import { TableSorterProps } from './interfaces'

const TableSorter = ({ className, value }: TableSorterProps) => {
    const { setFieldValue, getFieldProps } = useFormikContext()
    const { value: sortBy } = getFieldProps('sortBy')
    const { value: sort } = getFieldProps('sort')

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (sortBy === value) {
            sort === Sort.Asc ? setFieldValue('sort', Sort.Desc) : setFieldValue('sort', Sort.Asc)
        } else {
            setFieldValue('sort', Sort.Asc)
            setFieldValue('sortBy', value)
        }
    }

    return (
        <button onClick={handleClick} className={`${className} flex items-center justify-center font-semibold`}>
            {capitalizeFirstLetter(value)}
            <ChevronDownIcon
                className={`h-6 w-6 ${sortBy === value ? 'block' : 'hidden'} ${
                    sort === Sort.Desc ? null : 'rotate-180'
                }`}
            />
        </button>
    )
}

export default TableSorter
