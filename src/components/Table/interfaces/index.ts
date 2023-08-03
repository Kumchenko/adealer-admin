export type Cell = number | string | null | JSX.Element

export type Row = Cell[]

export type Header = string

export type Action = string

export type TableProps = {
    className?: string
    headers: Header[]
    data: Row[]
    actions: Action[]
}

export type TableHeaderCellProps = {
    className?: string
    value: string
}

export type TableRowProps = {
    className?: string
    headers: Header[]
    action: Action
    data: Row
}

export type TableCellProps = {
    className?: string
    header: Header
    data: Cell
}

export type TableSorterProps = {
    className?: string
    value: string
}
