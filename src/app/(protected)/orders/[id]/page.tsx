'use client'
import loading from '@/app/loading'
import Section from '@/components/Section/Section'
import { useGetOrderQuery } from '@/services/order'
import { idToString } from '@/utils'
import OrderForm from './components/OrderForm'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { useMemo } from 'react'

const OrderPage = ({ params: { id: idString } }: { params: { id: string } }) => {
    const id = useMemo(() => parseInt(idString), [idString])
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

export default OrderPage
