'use client'
import loading from '@/app/loading'
import Section from '@/components/Section/Section'
import { useGetOrderQuery } from '@/services/order'
import { idToString } from '@/utils/idToString'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import OrderForm from '../OrderForm/OrderForm'

const OrderSection = ({ id }: { id: number }) => {
    const { order, isSuccess, isLoading, isUninitialized, isError, refetch } = useGetOrderQuery(id, {
        selectFromResult: ({ data, ...other }) => ({
            order: data,
            ...other,
        }),
    })

    return (
        <Section>
            <h3 className="text-center text-h3 font-semibold">{`Order #${idToString(id)}`}</h3>
            {isLoading || isUninitialized ? loading() : null}
            {isSuccess && order ? (
                <>
                    <p className="mb-6 mt-2 text-center text-xl sm:text-xl">
                        {new Date(order.created).toLocaleString()}
                    </p>
                    <OrderForm order={order} />
                </>
            ) : null}
            {isError ? <ErrorCard reset={refetch} /> : null}
        </Section>
    )
}

export default OrderSection
