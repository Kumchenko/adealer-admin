'use client'

import { flexRender, Table as TableType } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface DataTableProps<TData> {
  table: TableType<TData>
  onRowClick?: (id: string) => void
  className?: string
}

export function DataTable<TData>({ table, className, onRowClick }: DataTableProps<TData>) {
  return (
    <Table className={className}>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead
                  key={header.id}
                  style={{
                    width: `${header.getSize()}px`,
                    minWidth: `${header.column.columnDef.minSize}px`,
                    maxWidth: `${header.column.columnDef.maxSize}px`,
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className={cn({ ['cursor-pointer']: !!onRowClick })}
              onClick={() => onRowClick?.(row.id)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  style={{
                    width: `${cell.column.getSize()}px`,
                    minWidth: `${cell.column.columnDef.minSize}px`,
                    maxWidth: `${cell.column.columnDef.maxSize}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
