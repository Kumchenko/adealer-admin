'use client'
import loading from '@/app/loading'
import Section from '@/components/Section/Section'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { DataTable } from '@/components/DataTable'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { useEmployees } from '@/api/queries/Employee/queries'
import { useEmployeesColumns } from '@/hooks/useEmployeesColumns'

const AuditSection = () => {
  const columns = useEmployeesColumns()

  const { data, isError, dataUpdatedAt, isPlaceholderData } = useEmployees()

  const table = useReactTable({
    data: data ?? [],
    columns,
    getRowId: row => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    enableMultiSort: false,
    manualSorting: true,
    manualPagination: true,
    enableSorting: false,
  })

  const getContent = () => {
    if (data) {
      return <DataTable className={cn({ ['opacity-70']: isPlaceholderData })} table={table} key={dataUpdatedAt} />
    }
    if (isError) {
      return <ErrorCard />
    }
    return loading()
  }

  return (
    <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
      <h3 className="text-center text-h3 font-semibold">Employees</h3>
      {getContent()}
    </Section>
  )
}

export default AuditSection
