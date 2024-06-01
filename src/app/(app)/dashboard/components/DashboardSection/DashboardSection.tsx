'use client'
import Section from '@/components/Section/Section'
import DashboardGrid from '../DashboardView/DashboardGrid'
import loading from '@/app/loading'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { useRouter } from 'next/navigation'
import { useOrdersStatistics } from '@/api/queries/Order/queries'
import { useCallMesStatistics } from '@/api/queries/CallMe/queries'
import SearchForm from '../SearchForm'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { useDashboardFiltersStore } from '@/stores/DashboardFiltersStore'

const DashboardSection = () => {
  const router = useRouter()

  const { to } = useDateFiltersStore()
  const { timeframe } = useDashboardFiltersStore()

  const { data: orderStats, isError: isOrderError } = useOrdersStatistics({ timeframe, to })
  const { data: callStats, isError: isCallError } = useCallMesStatistics({ timeframe, to })

  const isError = isOrderError || isCallError

  const getContent = () => {
    if (orderStats && callStats) {
      return <DashboardGrid orderStats={orderStats} callStats={callStats} />
    }
    if (isError) {
      return <ErrorCard reset={router.refresh} />
    }
    return loading()
  }

  return (
    <Section className="mx-auto flex flex-col gap-y-6 md:w-3/4">
      <h3 className="text-center text-h3 font-semibold">Dashboard</h3>
      <SearchForm />
      {getContent()}
    </Section>
  )
}

export default DashboardSection
