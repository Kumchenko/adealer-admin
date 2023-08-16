'use client'
import loading from '@/app/loading'
import Card from '@/components/Card/Card'
import Section from '@/components/Section/Section'
import { useGetCallQuery } from '@/services/calls'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import CallForm from '../CallForm/CallForm'
import { CallSectionProps } from './interfaces'

const CallSection = ({ id }: CallSectionProps) => {
    const { call, isSuccess, isLoading, isUninitialized, isError, refetch } = useGetCallQuery(id, {
        selectFromResult: ({ data, ...other }) => ({
            call: data,
            ...other,
        }),
    })

    return (
        <Section>
            <h3 className="mb-6 text-center text-h3 font-semibold">{`Call #${id}`}</h3>
            {isLoading || isUninitialized ? loading() : null}
            {isSuccess && call ? (
                <Card className="mx-auto grid w-80 grid-cols-3 gap-3">
                    <CallForm call={call} />
                </Card>
            ) : null}
            {isError ? <ErrorCard reset={refetch} /> : null}
        </Section>
    )
}

export default CallSection
