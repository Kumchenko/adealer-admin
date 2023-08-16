import { Metadata } from 'next'
import OrdersSection from './components/OrdersSection/OrdersSection'

export const metadata: Metadata = {
    title: 'Orders',
    description: "Managing Orders of ADealer's managing system",
}

const Orders = () => {
    return <OrdersSection />
}

export default Orders
