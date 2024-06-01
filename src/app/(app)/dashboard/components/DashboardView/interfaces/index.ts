import { ICallMeStatistics, IOrderStatistics } from 'adealer-types'
import { PropsWithChildren } from 'react'

export type DashboardGridProps = {
  orderStats: IOrderStatistics
  callStats: ICallMeStatistics
}

export type DashboardCardProps = PropsWithChildren<{ title: string; className?: string }>
