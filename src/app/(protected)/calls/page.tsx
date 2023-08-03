'use client'
import { useGetCallsQuery } from '@/services/calls'
import Table from '../../../components/Table/Table'
import PageSelector from '@/components/PageSelector/PageSelector'
import loading from '@/app/loading'
import AmountSelector from '@/components/AmountSelector/AmountSelector'
import { itemsAmounts } from '@/constants'
import { FormikProvider, useFormik } from 'formik'
import Section from '@/components/Section/Section'
import { useEffect } from 'react'
import SearchForm from './components/SearchForm/SearchForm'
import { CallField, Sort } from '@/interfaces'

const Calls = () => {
    const initialValues = {
        id: '',
        name: '',
        tel: '',
        filter: 'all',
        page: 1,
        perPage: 5,
        apply: false,
        from: '',
        to: '',
        sort: Sort.Asc,
        sortBy: CallField.ID,
    }
    const formik = useFormik({
        initialValues,
        onSubmit: () => {},
    })

    const { values, setFieldValue } = formik

    const { calls, headers, pages, actions, isLoading, isFetching, isError, isSuccess, isUninitialized } =
        useGetCallsQuery(
            {
                ...values,
                apply: values.apply ? true : undefined,
            },
            {
                selectFromResult: ({ data, ...other }) => ({
                    actions: data ? data.data.map(call => `/calls/${call.id}`) : null, // Generating hrefs for action buttons
                    headers: data ? Object.keys(data.data[0]) : null, // Headers for Table
                    calls: data?.data // Normalizing data for Table
                        .map(call => ({
                            ...call,
                            created: new Date(call.created).toLocaleString(),
                            checked: call.checked
                                ? new Date(call.checked).toLocaleString()
                                : new Date(0).toLocaleString().replace(/\w/g, '–'),
                        }))
                        .map(call => Object.values(call)),
                    pages: data?.pagination.pages, // Getting pages
                    ...other,
                }),
                pollingInterval: 30000,
            },
        )

    // Set First page when pages count changed
    useEffect(() => {
        if (pages && values.page > pages) {
            setFieldValue('page', 1)
        }
    }, [values.page, pages])

    return (
        <FormikProvider value={formik}>
            <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
                <h3 className="text-center text-h3 font-semibold">Requested Calls</h3>
                <SearchForm />
                {isLoading || isUninitialized ? loading() : null}
                {isSuccess && calls && actions && headers ? (
                    <Table
                        className={`${isFetching && 'opacity-85 blur-xs saturate-50'}`}
                        data={calls}
                        headers={headers}
                        actions={actions}
                    />
                ) : null}
                <div className="flex justify-center gap-5">
                    <AmountSelector
                        changeAmount={amount => setFieldValue('perPage', amount)}
                        amount={values.perPage}
                        amounts={itemsAmounts}
                    />
                    <PageSelector changePage={page => setFieldValue('page', page)} page={values.page} pages={pages} />
                </div>
            </Section>
        </FormikProvider>
    )
}

export default Calls
