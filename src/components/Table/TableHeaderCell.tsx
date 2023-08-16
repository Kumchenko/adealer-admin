import TableSorter from './TableSorter'

const TableHeaderCell = ({ value }: { value: string }) => {
    return (
        <th>
            <TableSorter className="mx-auto" value={value} />
        </th>
    )
}

export default TableHeaderCell
