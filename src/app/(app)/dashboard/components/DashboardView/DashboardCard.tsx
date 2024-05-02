import Card from '@/components/Card/Card'
import { memo } from 'react'
import { DashboardCardProps } from './interfaces'

const DashboardCard = ({ title, children }: DashboardCardProps) => {
    return (
        <Card>
            <h5 className="mb-2 text-h6">{title}</h5>
            {children}
        </Card>
    )
}

export default memo(DashboardCard)
