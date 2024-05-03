'use client'
import loading from '@/app/loading'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import PageSelector from '@/components/PageSelector/PageSelector'
import Section from '@/components/Section/Section'
import { Sort, SortOptions, OrdersPerPageOptions, OrderSortFields } from '@/constants'
import { FormSelector } from '@/components/Form'
import SearchForm from '../SearchForm/SearchForm'
import { useRouter } from 'next/navigation'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { useOrderFiltersStore } from '@/stores/OrderFiltersStore'
import { useOrders } from '@/api/queries/Order/queries'
import { EOrderSortByField } from 'adealer-types'
import { DataTable } from '@/components/DataTable'
import { useOrdersColumns } from '@/hooks/useOrdersColumns'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

const OrderSection = () => {
  const router = useRouter()

  const { from, to } = useDateFiltersStore()
  const {
    id,
    name,
    surname,
    tel,
    email,
    modelId,
    componentId,
    qualityId,
    apply,
    page,
    perPage,
    sortBy,
    sortDesc,
    filter,
    onSortingChange,
    setValue,
  } = useOrderFiltersStore()

  const columns = useOrdersColumns()

  const { data, isError } = useOrders({
    page: page.toString(),
    perPage: perPage.toString(),
    id,
    name,
    surname,
    tel,
    email,
    modelId,
    componentId,
    qualityId,
    apply,
    filter,
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

  const handleRowClick = (id: string) => router.push(`/orders/${id}`)

  const getContent = () => {
    if (data) {
      return <DataTable table={table} onRowClick={handleRowClick} />
    }
    if (isError) {
      return <ErrorCard />
    }
    return loading()
  }

  return (
    <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
      <h3 className="text-center text-h3 font-semibold">Orders</h3>
      <SearchForm />
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
        <FormSelector
          id="sortBy"
          label="Sort by"
          options={OrderSortFields}
          value={sortBy}
          onChange={e => setValue('sortBy', e.target.value as EOrderSortByField)}
        />
        <FormSelector
          id="sort"
          label="Order"
          options={SortOptions}
          value={sortDesc ? Sort.Desc : Sort.Asc}
          onChange={e => setValue('sortDesc', e.target.value === Sort.Desc)}
        />
      </div>
      {getContent()}
      <div className="flex justify-center gap-5">
        <FormSelector
          id="perPage"
          label="Orders"
          value={perPage}
          onChange={e => setValue('perPage', parseInt(e.target.value))}
          options={OrdersPerPageOptions}
        />
        <PageSelector setPage={page => setValue('page', page)} page={page} pages={data?.pagination.pages} />
      </div>
    </Section>
  )
}

export default OrderSection
