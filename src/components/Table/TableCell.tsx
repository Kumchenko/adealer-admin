import { TableCellProps } from './interfaces'
import TableSorter from './TableSorter'

const TableCell = ({ className, data, header }: TableCellProps) => {
    return (
        <td
            className={`
                ${className} px-5 py-2
                max-sm:flex max-sm:justify-between max-sm:gap-2 sm:px-3
            `}
        >
            <TableSorter className="sm:hidden" value={header} />
            <span className="max-sm:text-right">{data}</span>
        </td>
    )
}

export default TableCell
