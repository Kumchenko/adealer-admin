import { baseIdConverter, modelIdConverter } from '@/utils/stringConverter'
import { WrenchIcon, PhoneArrowUpRightIcon, DevicePhoneMobileIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { PieChart } from 'react-minimal-pie-chart'
import DashboardCard from './DashboardCard'
import { DashboardGridProps } from './interfaces'
import { memo } from 'react'

const DashboardGrid = ({ orderStats, callStats }: DashboardGridProps) => {
    return (
        <div className="mx-auto grid grid-cols-1 items-center gap-3 sm:grid-cols-2 lg:w-3/4">
            <DashboardCard title="Total orders">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-center text-h3 font-semibold">{orderStats?.all}</p>
                    <WrenchIcon className="h-6 w-6" />
                </div>
            </DashboardCard>
            <DashboardCard title="Total calls">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-center text-h3 font-semibold">{callStats?.all}</p>
                    <PhoneArrowUpRightIcon className="h-6 w-6" />
                </div>
            </DashboardCard>
            <DashboardCard title="Orders">
                <PieChart
                    data={[
                        { value: orderStats.created, color: 'transparent' },
                        { value: orderStats.processing, color: '#a78bfa' },
                        { value: orderStats.done, color: '#5b21b6' },
                    ]}
                    lineWidth={25}
                    lengthAngle={-360}
                    startAngle={270}
                    rounded={true}
                    label={({ dataEntry }) => (dataEntry.value ? `${Math.round(dataEntry.percentage)}%` : '')}
                    labelPosition={140}
                    labelStyle={{ fontSize: 12, fill: '#5b21b6' }}
                    background="#ddd6fe"
                    radius={30}
                    viewBoxSize={[200, 100]}
                    center={[100, 50]}
                />
                <ul className="mt-2 text-sm">
                    <li className="flex items-center gap-1">
                        <span className="block h-3 w-3 rounded-lg bg-violet"></span>
                        {`– Done (${orderStats.done} orders)`}
                    </li>
                    <li className="flex items-center gap-1">
                        <span className="block h-3 w-3 rounded-lg bg-violet-light"></span>
                        {`– Processing (${orderStats.processing} orders)`}
                    </li>
                    <li className="flex items-center gap-1">
                        <span className="block h-3 w-3 rounded-lg bg-violet-bright"></span>
                        {`– Created (${orderStats.created} orders)`}
                    </li>
                </ul>
            </DashboardCard>
            <DashboardCard title="Checked calls">
                <PieChart
                    data={[{ value: callStats.checked, color: '#5b21b6' }]}
                    lineWidth={25}
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                    labelPosition={0}
                    labelStyle={{ fontSize: 14, fill: 'currentcolor' }}
                    startAngle={270}
                    totalValue={callStats.all}
                    rounded={true}
                    background="#ddd6fe"
                    radius={30}
                    viewBoxSize={[200, 80]}
                    center={[100, 40]}
                />
            </DashboardCard>
            <DashboardCard title="Top model">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-center text-2xl font-semibold">{modelIdConverter(orderStats?.model)}</p>
                    <DevicePhoneMobileIcon className="h-6 w-6" />
                </div>
            </DashboardCard>
            <DashboardCard title="Top component">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-center text-2xl font-semibold">{baseIdConverter(orderStats?.component)}</p>
                    <CpuChipIcon className="h-6 w-6" />
                </div>
            </DashboardCard>
        </div>
    )
}

export default memo(DashboardGrid)
