import Button from '@/components/Button/Button'
import { DesignColor } from '@/constants'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import TableCell from './TableCell'
import { TableRowProps } from './interfaces'
import { memo } from 'react'

const TableRow = ({ data, headers, action }: TableRowProps) => {
    return (
        <tr
            className="
                overflow-hidden max-sm:rounded-3xl max-sm:border
                max-sm:bg-violet-200 sm:odd:bg-violet-50 max-sm:even:[&>td]:bg-violet-50"
        >
            {data.map((cell, index) => (
                <TableCell key={cell} header={headers[index]}>
                    {cell}
                </TableCell>
            ))}
            <TableCell header="Action">
                <Button
                    color={DesignColor.Violet}
                    className="mx-auto !rounded-xl !p-1"
                    href={action}
                    aria-label="Edit call"
                >
                    <PencilSquareIcon className="h-5 w-5" />
                </Button>
            </TableCell>
        </tr>
    )
}

export default memo(TableRow)
