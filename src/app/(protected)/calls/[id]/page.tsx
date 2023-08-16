'use client'
import loading from '@/app/loading'
import Card from '@/components/Card/Card'
import Section from '@/components/Section/Section'
import { useGetCallsQuery } from '@/services/calls'
import CallForm from './components/CallForm/CallForm'
import ErrorCard from '@/components/ErrorCard/ErrorCard'

const CallPage = ({ params: { id } }: { params: { id: string } }) => {
    const { call, isSuccess, isLoading, isUninitialized, isError, refetch } = useGetCallsQuery(
        { id },
        {
            selectFromResult: ({ data, ...other }) => ({
                call: data?.data.find(call => call.id === parseInt(id)),
                ...other,
            }),
        },
    )

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

export default CallPage
