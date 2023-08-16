'use client'
import { useGetCallsQuery } from '@/services/calls'
import Table from '@/components/Table/Table'
import PageSelector from '@/components/PageSelector/PageSelector'
import loading from '@/app/loading'
import { CallTableHeaders, callsPerPage, pollingInterval } from '@/constants'
import { FormikProvider, useFormik } from 'formik'
import Section from '@/components/Section/Section'
import { useDeferredValue, useEffect, useMemo } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import { CallField, CallFilter, Sort } from '@/constants'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { GetCallsArgs } from '@/interfaces'
import FormSelector from '@/components/Form/FormSelector'

const CallsSection = () => {
    const initialValues: GetCallsArgs = {
        id: '',
        name: '',
        tel: '',
        from: '',
        to: '',
        filter: CallFilter.All,
        page: 1,
        perPage: callsPerPage[0],
        apply: false,
        sort: Sort.Asc,
        sortBy: CallField.ID,
    }
    const formik = useFormik<GetCallsArgs>({
        initialValues,
        onSubmit: () => {},
    })

    // Destructuring some formik data
    const { values, setFieldValue } = formik

    // Decreasing rerender count of Calls Table
    const deferredValues = useDeferredValue(values)

    const { calls, pages, isLoading, isFetching, isError, isSuccess, isUninitialized, refetch } = useGetCallsQuery(
        deferredValues,
        {
            selectFromResult: ({ data, ...other }) => ({
                calls: data?.data,
                pages: data?.pagination.pages,
                ...other,
            }),
            pollingInterval,
        },
    )

    const [items, actions] = useMemo(
        () => [
            calls
                ?.map(call => ({
                    ...call,
                    created: new Date(call.created).toLocaleString(),
                    checked: call.checked
                        ? new Date(call.checked).toLocaleString()
                        : new Date(0).toLocaleString().replace(/\w/g, '–'),
                }))
                .map(call => Object.values(call)),
            calls?.map(({ id }) => `/calls/${id}`),
        ],
        [calls],
    )

    // Set First page when pages count changed
    useEffect(() => {
        setFieldValue('page', 1)
    }, [pages])

    const callView = useMemo(() => {
        if (isSuccess) {
            if (calls && calls.length > 0 && items && actions) {
                return (
                    <Table
                        className={`${isFetching && 'opacity-85 blur-xs saturate-50'}`}
                        data={items}
                        headers={CallTableHeaders}
                        actions={actions}
                    />
                )
            } else {
                return <span className="text-center text-2xl font-semibold">No calls</span>
            }
        }
    }, [isSuccess, isFetching, calls, items, actions])

    return (
        <FormikProvider value={formik}>
            <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
                <h3 className="text-center text-h3 font-semibold">Requested Calls</h3>
                <SearchForm />
                {isLoading || isUninitialized ? loading() : null}
                {callView}
                {isError ? <ErrorCard reset={refetch} /> : null}
                <div className="flex justify-center gap-5">
                    <FormSelector id="perPage" label="Calls" name="perPage" options={callsPerPage} />
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

export default CallsSection
