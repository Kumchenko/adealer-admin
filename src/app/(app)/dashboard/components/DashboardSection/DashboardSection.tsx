'use client'
import Section from '@/components/Section/Section'
import DashboardGrid from '../DashboardView/DashboardGrid'
import loading from '@/app/loading'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { useRouter } from 'next/navigation'
import { useOrdersStatistics } from '@/api/queries/Order/queries'
import { useCallMesStatistics } from '@/api/queries/CallMe/queries'

const DashboardSection = () => {
  const router = useRouter()

  const { data: orderStats, isError: isOrderError } = useOrdersStatistics()
  const { data: callStats, isError: isCallError } = useCallMesStatistics()

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
    <Section className="mx-auto flex flex-col gap-y-6 xl:w-5/6">
      <h3 className="text-center text-h3 font-semibold">Dashboard</h3>
      {getContent()}
    </Section>
  )
}

export default DashboardSection
