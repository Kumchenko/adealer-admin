import { ColumnHeader } from '@/components/DataTable/ColumnHeader'
import { priceFormatter } from '@/utils/priceFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { EStatus, IOperation, IOrderRead } from 'adealer-types'
import { format } from 'date-fns'
import { baseIdConverter, modelIdConverter } from '../utils/stringConverter'
import { Badge } from '@/components/ui/badge'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

export const useOrdersColumns = (): ColumnDef<IOrderRead>[] => {
  return [
    {
      accessorKey: 'id',
      minSize: 50,
      maxSize: 70,
      header: ({ column }) => <ColumnHeader column={column} title="ID" />,
      cell: ({
        row: {
          original: { id },
        },
      }) => id,
    },
    {
      accessorKey: 'name',
      size: 120,
      header: ({ column }) => <ColumnHeader column={column} title="Name" />,
      cell: ({
        row: {
          original: { name },
        },
      }) => <span className="font-medium text-violet-900">{name}</span>,
    },
    {
      accessorKey: 'tel',
      minSize: 145,
      header: ({ column }) => <ColumnHeader column={column} title="Phone" />,
      cell: ({
        row: {
          original: { tel },
        },
      }) => tel,
    },
    {
      accessorKey: 'service',
      minSize: 165,
      header: ({ column }) => <ColumnHeader column={column} title="Model" className="justify-center" />,
      cell: ({
        row: {
          original: {
            service: { modelId, componentId, qualityId },
          },
        },
      }) => (
        <div>
          <div className="text-center font-medium text-violet-900">{modelIdConverter(modelId)}</div>
          <div className="text-center">{`${baseIdConverter(componentId)} - ${baseIdConverter(qualityId)}`}</div>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'operations',
      maxSize: 120,
      header: ({ column }) => <ColumnHeader column={column} title="Operations" />,
      cell: ({
        row: {
          original: { operations },
        },
      }) => {
        const getBadgeVariant = (operation: IOperation) => {
          switch (operation.status) {
            case EStatus.DONE:
            case EStatus.RETURNED:
              return 'success'
            case EStatus.ISSUED:
              return 'destructive'
            default:
              return 'info'
          }
        }
        return (
          <div className="flex flex-wrap gap-1">
            {!!operations.length
              ? operations.map(op => (
                  <Badge key={op.id} variant={getBadgeVariant(op)}>
                    {capitalizeFirstLetter(op.status.toLowerCase())}
                  </Badge>
                ))
              : '–'}
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'cost',
      minSize: 135,
      header: ({ column }) => <ColumnHeader column={column} title="Cost" />,
      cell: ({
        row: {
          original: { cost },
        },
      }) => <span className="font-medium text-violet-900">{priceFormatter.format(cost)}</span>,
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
  ]
}
