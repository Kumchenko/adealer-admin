import { memo } from 'react'
import OrderItem from './OrderItem'
import { OrderListProps } from './interfaces'

const OrderList = ({ orders, className }: OrderListProps) => {
    return (
        <div className={`${className} grid grid-cols-12 items-start gap-3`}>
            {orders.map(order => (
                <OrderItem key={order.id} className="col-span-12 sm:col-span-6 md:col-span-4" order={order} />
            ))}
        </div>
    )
}

export default memo(OrderList)
