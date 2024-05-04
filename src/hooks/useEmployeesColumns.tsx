import { useMyEmployee } from '@/api/queries/Employee/queries'
import { EmployeeActionCell } from '@/app/(app)/employees/components/EmployeeActionCell'
import { ColumnHeader } from '@/components/DataTable/ColumnHeader'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { IEmployeeRead } from 'adealer-types'

export const useEmployeesColumns = (): ColumnDef<IEmployeeRead>[] => {
  const { data } = useMyEmployee()
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
      accessorKey: 'role',
      size: 150,
      header: ({ column }) => <ColumnHeader column={column} title="Role" />,
      cell: ({
        row: {
          original: { role },
        },
      }) => role,
      enableSorting: false,
    },
    {
      accessorKey: 'attempts',
      size: 150,
      header: ({ column }) => <ColumnHeader column={column} title="Attempts" />,
      cell: ({
        row: {
          original: { attempts },
        },
      }) => {
        const getBadgeVariant = () => {
          switch (true) {
            case attempts >= 3:
              return 'success'
            case attempts === 0:
              return 'destructive'
            default:
              return 'warning'
          }
        }
        return <Badge variant={getBadgeVariant()}>{attempts}</Badge>
      },
      enableSorting: false,
    },
    {
      accessorKey: 'action',
      maxSize: 75,
      header: ({ column }) => <ColumnHeader column={column} title="Action" className="justify-center" />,
      cell: ({ row: { original } }) => (
        <EmployeeActionCell employee={original} hide={!data || data.id === original.id} />
      ),
      enableSorting: false,
    },
  ]
}
