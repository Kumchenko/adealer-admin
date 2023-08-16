import { OrderData } from '@/interfaces'

export type OrderListProps = {
    className?: string
    orders: OrderData[]
}

export type OrderItemProps = {
    className?: string
    order: OrderData
}
