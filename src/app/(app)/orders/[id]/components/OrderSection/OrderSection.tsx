'use client'
import loading from '@/app/loading'
import Section from '@/components/Section/Section'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import OrderForm from '../OrderForm/OrderForm'
import { useOrder } from '@/api/queries/Order/queries'
import { idToString } from '@/utils/idToString'

const OrderSection = ({ id }: { id: string }) => {
  const { data, isError } = useOrder(id)

  const getContent = () => {
    if (data) {
      return (
        <>
          <p className="mb-6 mt-2 text-center text-xl sm:text-xl">{new Date(data.created).toLocaleString()}</p>
          <OrderForm order={data} />
        </>
      )
    }
    if (isError) {
      return <ErrorCard />
    }
    return loading()
  }

  return (
    <Section>
      <h3 className="text-center text-h3 font-semibold">{`Order #${idToString(parseInt(id))}`}</h3>
      {getContent()}
    </Section>
  )
}

export default OrderSection
