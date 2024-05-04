'use client'
import PageSelector from '@/components/PageSelector/PageSelector'
import loading from '@/app/loading'
import { Sort, SortOptions, AuditSortFields, AuditPerPageOptions } from '@/constants'
import Section from '@/components/Section/Section'
import SearchForm from './SearchForm'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { DataTable } from '@/components/DataTable'
import { EActionMethod, EActionSortByField } from 'adealer-types'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { cn } from '@/lib/utils'
import FieldSelector from '@/components/Field/FieldSelector'
import { useActionFiltersStore } from '@/stores/ActionFiltersStore'
import { useActions } from '@/api/queries/Action/queries'
import { useAuditColumns } from '@/hooks/useAuditColumns'

const AuditSection = () => {
  const { from, to } = useDateFiltersStore()
  const { page, perPage, login, method, sortBy, sortDesc, setValue, onSortingChange } = useActionFiltersStore()

  const columns = useAuditColumns()

  const { data, isError, dataUpdatedAt, isPlaceholderData } = useActions({
    page: page.toString(),
    perPage: perPage.toString(),
    login,
    method: method as EActionMethod,
    from,
    to,
    sortBy,
    sortDesc,
  })

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getRowId: row => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: [
        {
          id: sortBy,
          desc: sortDesc,
        },
      ],
    },
    enableMultiSort: false,
    manualSorting: true,
    manualPagination: true,
    onSortingChange,
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
      <h3 className="text-center text-h3 font-semibold">Audit of Employees' actions</h3>
      <SearchForm />
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
        <FieldSelector
          id="sortBy"
          label="Sort by"
          options={AuditSortFields}
          value={sortBy}
          onChange={e => setValue('sortBy', e.target.value as EActionSortByField)}
        />
        <FieldSelector
          id="sort"
          label="Order"
          options={SortOptions}
          value={sortDesc ? Sort.Desc : Sort.Asc}
          onChange={e => setValue('sortDesc', e.target.value === Sort.Desc)}
        />
      </div>
      {getContent()}
      <div className="flex justify-center gap-5">
        <FieldSelector
          id="perPage"
          label="Actions"
          onChange={e => setValue('perPage', parseInt(e.target.value))}
          options={AuditPerPageOptions}
        />
        <PageSelector setPage={pageNum => setValue('page', pageNum)} page={page} pages={data?.pagination.pages} />
      </div>
    </Section>
  )
}

export default AuditSection
