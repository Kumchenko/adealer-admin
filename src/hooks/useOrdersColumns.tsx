import { ColumnHeader } from '@/components/DataTable/ColumnHeader'
import { priceFormatter } from '@/utils/priceFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { IOrderRead } from 'adealer-types'
import { format } from 'date-fns'
import { baseIdConverter, modelIdConverter } from '../utils/stringConverter'

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
      accessorKey: 'modelId',
      minSize: 140,
      header: ({ column }) => <ColumnHeader column={column} title="Model" />,
      cell: ({
        row: {
          original: { service },
        },
      }) => <span className="font-medium text-violet-900">{modelIdConverter(service.modelId)}</span>,
      enableSorting: false,
    },
    {
      accessorKey: 'componentId',
      minSize: 120,
      header: ({ column }) => <ColumnHeader column={column} title="Component" />,
      cell: ({
        row: {
          original: { service },
        },
      }) => baseIdConverter(service.componentId),
      enableSorting: false,
    },
    {
      accessorKey: 'qualityId',
      minSize: 120,
      header: ({ column }) => <ColumnHeader column={column} title="Quality" />,
      cell: ({
        row: {
          original: { service },
        },
      }) => baseIdConverter(service.qualityId),
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
