import { CallActionCell } from '@/app/(app)/calls/components/CallActionCell'
import { ColumnHeader } from '@/components/DataTable/ColumnHeader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { ICallMe } from 'adealer-types'
import { format } from 'date-fns'
import { EllipsisVertical } from 'lucide-react'

export const useCallColumns = (): ColumnDef<ICallMe>[] => {
  return [
    {
      accessorKey: 'id',
      size: 80,
      header: ({ column }) => <ColumnHeader column={column} title="ID" />,
      cell: ({
        row: {
          original: { id },
        },
      }) => id,
    },
    {
      accessorKey: 'name',
      size: 130,
      header: ({ column }) => <ColumnHeader column={column} title="Name" />,
      cell: ({
        row: {
          original: { name },
        },
      }) => name,
    },
    {
      accessorKey: 'tel',
      size: 150,
      header: ({ column }) => <ColumnHeader column={column} title="Phone" />,
      cell: ({
        row: {
          original: { tel },
        },
      }) => tel,
    },
    {
      accessorKey: 'created',
      minSize: 200,
      header: ({ column }) => <ColumnHeader column={column} title="Created" />,
      cell: ({
        row: {
          original: { created },
        },
      }) => {
        return format(created, 'do MMMM y  H:mm')
      },
    },
    {
      accessorKey: 'checked',
      minSize: 200,
      header: ({ column }) => <ColumnHeader column={column} title="Checked" />,
      cell: ({
        row: {
          original: { checked },
        },
      }) => {
        return checked ? format(checked, 'do MMMM y  H:mm') : '–'
      },
    },
    {
      accessorKey: 'action',
      maxSize: 75,
      header: ({ column }) => <ColumnHeader column={column} title="Action" className="justify-center" />,
      cell: ({ row: { original } }) => <CallActionCell call={original} />,
      enableSorting: false,
    },
  ]
}
