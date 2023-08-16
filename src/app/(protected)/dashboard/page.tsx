'use client'
import Section from '@/components/Section/Section'
import DashboardGrid from './components/DashboardView/DashboardGrid'
import { useGetCallStatsQuery } from '@/services/calls'
import { useGetOrderStatsQuery } from '@/services/order'
import loading from '@/app/loading'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { useRouter } from 'next/navigation'
import { pollingInterval } from '@/constants'

const Dashboard = () => {
    const router = useRouter()
    const {
        data: orderStats,
        isSuccess: isOrderSuccess,
        isLoading: isOrderLoading,
        isError: isOrderError,
    } = useGetOrderStatsQuery(undefined, {
        pollingInterval,
    })
    const {
        data: callStats,
        isSuccess: isCallSuccess,
        isLoading: isCallLoading,
        isError: isCallError,
    } = useGetCallStatsQuery(undefined, {
        pollingInterval,
    })

    const isLoading = isOrderLoading || isCallLoading
    const isSuccess = isOrderSuccess && isCallSuccess
    const isError = isOrderError || isCallError

    return (
        <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
            <h3 className="text-center text-h3 font-semibold">Dashboard</h3>
            {isLoading ? loading() : null}
            {isSuccess && orderStats && callStats ? (
                <DashboardGrid orderStats={orderStats} callStats={callStats} />
            ) : null}
            {isError ? <ErrorCard reset={router.refresh} /> : null}
        </Section>
    )
}

export default Dashboard
