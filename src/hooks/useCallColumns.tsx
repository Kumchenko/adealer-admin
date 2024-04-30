import { ColumnHeader } from '@/components/DataTable/ColumnHeader'
import { CallSortFieldKeys } from '@/constants'
import { ColumnDef } from '@tanstack/react-table'
import { ECallMeSortByField, ICallMe } from 'adealer-types'
import { format } from 'date-fns'

export const useCallColumns = (): ColumnDef<ICallMe>[] => {
  return [
    {
      accessorKey: 'id',
      size: 200,
      header: ({ column }) => <ColumnHeader column={column} title="ID" />,
      cell: ({
        row: {
          original: { id },
        },
      }) => id,
    },
    {
      accessorKey: 'name',
      size: 200,
      header: ({ column }) => <ColumnHeader column={column} title="Name" />,
      cell: ({
        row: {
          original: { name },
        },
      }) => name,
    },
    {
      accessorKey: 'tel',
      size: 200,
      header: ({ column }) => <ColumnHeader column={column} title="Phone" />,
      cell: ({
        row: {
          original: { tel },
        },
      }) => tel,
    },
    {
      accessorKey: 'created',
      size: 300,
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
      size: 300,
      header: ({ column }) => <ColumnHeader column={column} title="Checked" />,
      cell: ({
        row: {
          original: { checked },
        },
      }) => {
        return checked ? format(checked, 'do MMMM y  H:mm') : '–'
      },
    },
    //   {
    //     accessorKey: 'deletion',
    //     size: 75,
    //     header: ({ column }) => <ColumnHeader column={column} title="Дія" />,
    //     cell: ({
    //       row: {
    //         original: { id },
    //       },
    //     }) => (
    //       <Button
    //         variant="ghost"
    //         className="mx-auto"
    //         onClick={() => deleteWish(id)}
    //       >
    //         <Trash className="w-5 h-5 text-red-600" />
    //       </Button>
    //     ),
    //     enableSorting: false,
    //   },
  ]
}
