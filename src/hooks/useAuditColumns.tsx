import { ColumnHeader } from '@/components/DataTable/ColumnHeader'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { EActionMethod, IAction } from 'adealer-types'
import { format } from 'date-fns'

export const useAuditColumns = (): ColumnDef<IAction>[] => {
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
      accessorKey: 'login',
      size: 130,
      header: ({ column }) => <ColumnHeader column={column} title="Login" />,
      cell: ({
        row: {
          original: { login },
        },
      }) => <span className="font-medium">{login}</span>,
    },
    {
      accessorKey: 'date',
      minSize: 200,
      header: ({ column }) => <ColumnHeader column={column} title="Date" />,
      cell: ({
        row: {
          original: { date },
        },
      }) => {
        return format(date, 'do MMMM y  H:mm')
      },
    },
    {
      accessorKey: 'method',
      size: 150,
      header: ({ column }) => <ColumnHeader column={column} title="Method" />,
      cell: ({
        row: {
          original: { method },
        },
      }) => {
        const getBadgeVariant = () => {
          switch (method) {
            case EActionMethod.DELETE:
              return 'destructive'
            case EActionMethod.PATCH:
            case EActionMethod.PUT:
              return 'warning'
            case EActionMethod.POST:
              return 'success'
            default:
              return 'info'
          }
        }
        return <Badge variant={getBadgeVariant()}>{method}</Badge>
      },
      enableSorting: false,
    },
    {
      accessorKey: 'action',
      size: 150,
      header: ({ column }) => <ColumnHeader column={column} title="Action" />,
      cell: ({
        row: {
          original: { action },
        },
      }) => action,
      enableSorting: false,
    },
  ]
}
