'use client'
import loading from '@/app/loading'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import PageSelector from '@/components/PageSelector/PageSelector'
import Section from '@/components/Section/Section'
import { OrderFilter, Sort, orderSortByOptions, ordersPerPage, pollingInterval, sortOptions } from '@/constants'
import { FormikProvider, useFormik } from 'formik'
import SearchForm from './components/SearchForm/SearchForm'
import { useDeferredValue, useEffect } from 'react'
import { useGetOrdersQuery } from '@/services/order'
import { GetOrdersArgs } from '@/interfaces'
import OrderList from './components/OrderView/OrderList'
import { FormSelector } from '@/components/Form'

const Orders = () => {
    const initialValues: GetOrdersArgs = {
        id: '',
        name: '',
        surname: '',
        email: '',
        tel: '',
        filter: OrderFilter.All,
        page: 1,
        perPage: ordersPerPage[0],
        apply: false,
        modelId: '',
        componentId: '',
        qualityId: '',
        from: '',
        to: '',
        sort: Sort.Asc,
    }

    const formik = useFormik<GetOrdersArgs>({
        initialValues,
        onSubmit: () => {},
    })

    // Destructuring some formik data
    const { values, setFieldValue } = formik

    // Decreasing count of rerenders
    const deferredValues = useDeferredValue(values)

    const { orders, pages, isLoading, isFetching, isError, isSuccess, isUninitialized, refetch } = useGetOrdersQuery(
        deferredValues,
        {
            selectFromResult: ({ data, ...args }) => ({
                orders: data?.data,
                pages: data?.pagination.pages,
                ...args,
            }),
            pollingInterval,
        },
    )

    // Set First page when pages count changed
    useEffect(() => {
        setFieldValue('page', 1)
    }, [pages])

    return (
        <FormikProvider value={formik}>
            <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
                <h3 className="text-center text-h3 font-semibold">Orders</h3>
                <SearchForm />
                <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                    <FormSelector id="sortBy" label="Sort by" name="sortBy" options={orderSortByOptions} />
                    <FormSelector id="sort" label="Order" name="sort" options={sortOptions} />
                </div>
                {isLoading || isUninitialized ? loading() : null}
                {isSuccess && orders ? (
                    <OrderList className={`${isFetching && 'opacity-85 blur-xs saturate-50'}`} orders={orders} />
                ) : null}
                {isError ? <ErrorCard reset={refetch} /> : null}
                <div className="flex justify-center gap-5">
                    <FormSelector id="perPage" label="Orders" name="perPage" options={ordersPerPage} />
                    <PageSelector
                        changePage={page => setFieldValue('page', page)}
                        page={deferredValues.page}
                        pages={pages}
                    />
                </div>
            </Section>
        </FormikProvider>
    )
}

export default Orders
