import { baseIdConverter, modelIdConverter } from '@/utils/stringConverter'
import { idToString } from '@/utils/idToString'
import { OrderItemProps } from './interfaces'
import Card from '@/components/Card/Card'
import Button from '@/components/Button/Button'
import { DesignColor } from '@/constants'
import { memo } from 'react'
import { useRouter } from 'next/navigation'

const OrderItem = ({ order, className }: OrderItemProps) => {
    const router = useRouter()
    const {
        id,
        name,
        surname,
        tel,
        email,
        cost,
        service: { modelId, componentId, qualityId },
        created,
        operations,
    } = order

    const lastOperation = operations.length > 0 ? operations[operations.length - 1] : null

    return (
        <Card className={`${className} p-4 hover:shadow-xl`}>
            <div className="border-b pb-2">
                <h5 className="flex justify-between text-h5 font-semibold">
                    <span>#{idToString(id)}</span>
                    <span>{cost}₴</span>
                </h5>
                <p className="text-center">{new Date(created).toLocaleString()}</p>
            </div>
            <div className="border-b py-2">
                <p className="text-h6 font-medium">
                    {name} {surname}
                </p>
                <p>{tel}</p>
                <p>{email}</p>
            </div>
            <div className="border-b py-2">
                <p className="text-h6 font-medium">{modelIdConverter(modelId)}</p>
                <p>
                    {baseIdConverter(componentId)} {baseIdConverter(qualityId)}
                </p>
            </div>
            <div className="border-b py-2">
                <p className="text-h6 font-medium">Last operation:</p>
                {lastOperation ? (
                    <>
                        <p>
                            {lastOperation.status} by {lastOperation.employee.login}
                        </p>
                        <p>{new Date(lastOperation.dateTime).toLocaleString()}</p>
                    </>
                ) : (
                    <>
                        <p>NONE</p>
                        <p>{new Date().toLocaleString().replace(/\d/g, '-')}</p>
                    </>
                )}
            </div>
            <Button onClick={() => router.push(`/orders/${id}`)} className="mx-auto mt-2" color={DesignColor.Green}>
                Manage
            </Button>
        </Card>
    )
}

export default memo(OrderItem)
