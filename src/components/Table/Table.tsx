import TableHeaderCell from './TableHeaderCell'
import TableRow from './TableRow'
import { TableProps } from './interfaces'

const Table = ({ className, headers, data, actions }: TableProps) => {
    return (
        <table
            className={`${className} w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-3xl sm:border sm:bg-violet-bright`}
        >
            <thead className="max-sm:hidden">
                <tr className="[&>*]:p-3 [&>*]:font-semibold">
                    {headers.map((header, index) => (
                        <TableHeaderCell key={index} value={header} />
                    ))}
                    <th key="action">Action</th>
                </tr>
            </thead>
            <tbody className="rounded-3xl max-sm:flex max-sm:flex-col max-sm:gap-4">
                {data.map((row, index) => (
                    <TableRow key={index} action={actions[index]} headers={headers} data={row} />
                ))}
            </tbody>
        </table>
    )
}

export default Table
