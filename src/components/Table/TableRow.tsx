import Button from '@/components/Button/Button'
import { DesignColor } from '@/interfaces'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import TableCell from './TableCell'
import { TableRowProps } from './interfaces'

const TableRow = ({ data, headers, action }: TableRowProps) => {
    return (
        <tr
            className="
                overflow-hidden max-sm:rounded-3xl max-sm:border
                max-sm:bg-violet-bright sm:odd:bg-violet-white max-sm:even:[&>td]:bg-violet-white"
        >
            {data.map((cell, index) => (
                <TableCell key={index} header={headers[index]} data={cell} />
            ))}
            <TableCell
                header="Action"
                data={
                    <Button
                        color={DesignColor.Violet}
                        className="mx-auto !rounded-xl !p-1"
                        href={action}
                        aria-label="Edit call"
                    >
                        <PencilSquareIcon className="h-5 w-5" />
                    </Button>
                }
            />
        </tr>
    )
}

export default TableRow
