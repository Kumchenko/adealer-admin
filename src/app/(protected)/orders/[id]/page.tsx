import { Metadata } from 'next'
import OrderSection from './components/OrderSection/OrderSection'
import { OrderPageProps } from './interfaces'
import { idToString } from '@/utils/idToString'

export function generateMetadata({ params }: OrderPageProps): Metadata {
    const id = idToString(parseInt(params.id))
    return {
        title: `Order #${id}`,
        description: `Managing Order #${id} `,
    }
}

const Order = ({ params: { id: idString } }: OrderPageProps) => {
    const id = parseInt(idString)
    return <OrderSection id={id} />
}

export default Order
