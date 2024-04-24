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
import { useCallMes } from '@/api/queries/CallMe/queries'
import { ECallMeFilter, ECallMeSortField, ICallMeGetMany } from '@/api/models/CallMe'
import { ISort } from '@/api/models/Generic'

const initialValues: ICallMeGetMany = {
    id: '',
    name: '',
    tel: '',
    from: '',
    to: '',
    filter: ECallMeFilter.All,
    page: 1,
    perPage: callsPerPage[0],
    apply: false,
    sort: ISort.Asc,
    sortBy: ECallMeSortField.ID,
}

const CallsSection = () => {
    const formik = useFormik<ICallMeGetMany>({
        initialValues,
        onSubmit: () => {},
    })

    // Destructuring some formik data
    const { values, setFieldValue } = formik

    const { data } = useCallMes(values)

    return (
        <FormikProvider value={formik}>
            <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
                <h3 className="text-center text-h3 font-semibold">Requested Calls</h3>
                <SearchForm />
                {/* {isLoading || isUninitialized ? loading() : null} */}
                {/* {callView} */}
                {/* {isError ? <ErrorCard reset={refetch} /> : null}
                <div className="flex justify-center gap-5">
                    <FormSelector id="perPage" label="Calls" name="perPage" options={callsPerPage} />
                    <PageSelector
                        changePage={page => setFieldValue('page', page)}
                        page={deferredValues.page}
                        pages={pages}
                    />
                </div> */}
            </Section>
        </FormikProvider>
    )
}

export default CallsSection
