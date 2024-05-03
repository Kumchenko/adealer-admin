'use client'
import PageSelector from '@/components/PageSelector/PageSelector'
import loading from '@/app/loading'
import { CallSortFields, CallsPerPageOptions, Sort, SortOptions } from '@/constants'
import Section from '@/components/Section/Section'
import SearchForm from './SearchForm'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { useCallMes } from '@/api/queries/CallMe/queries'
import { useCallColumns } from '@/hooks/useCallColumns'
import { DataTable } from '@/components/DataTable'
import { useCallFiltersStore } from '@/stores/CallFilltersStore'
import { ECallMeSortByField } from 'adealer-types'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter } from 'next/navigation'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { cn } from '@/lib/utils'
import FieldSelector from '@/components/Field/FieldSelector'

const CallsSection = () => {
  const pathname = usePathname()
  const router = useRouter()

  const { from, to } = useDateFiltersStore()
  const { page, perPage, id, name, tel, apply, filter, sortBy, sortDesc, setValue, onSortingChange } =
    useCallFiltersStore()

  const columns = useCallColumns()

  const { data, isError, dataUpdatedAt, isPlaceholderData } = useCallMes({
    page: page.toString(),
    perPage: perPage.toString(),
    id,
    name,
    tel,
    from,
    to,
    apply,
    filter,
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
      <h3 className="text-center text-h3 font-semibold">Requested Calls</h3>
      <SearchForm />
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
        <FieldSelector
          id="sortBy"
          label="Sort by"
          options={CallSortFields}
          value={sortBy}
          onChange={e => setValue('sortBy', e.target.value as ECallMeSortByField)}
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
          label="Calls"
          onChange={e => setValue('perPage', parseInt(e.target.value))}
          options={CallsPerPageOptions}
        />
        <PageSelector setPage={pageNum => setValue('page', pageNum)} page={page} pages={data?.pagination.pages} />
      </div>
    </Section>
  )
}

export default CallsSection
