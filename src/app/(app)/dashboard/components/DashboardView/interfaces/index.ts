import { OrderStats, CallStats } from '@/interfaces'
import { PropsWithChildren } from 'react'

export type DashboardGridProps = {
    orderStats: OrderStats
    callStats: CallStats
}

export type DashboardCardProps = PropsWithChildren<{ title: string }>
