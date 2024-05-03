'use client'
import loading from '@/app/loading'
import Card from '@/components/Card/Card'
import Section from '@/components/Section/Section'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import CallForm from '../CallForm/CallForm'
import { CallSectionProps } from './interfaces'
import { useCallMe } from '@/api/queries/CallMe/queries'

const CallSection = ({ id }: CallSectionProps) => {
  const { data, isError } = useCallMe(id)

  const getContent = () => {
    if (data) {
      return (
        <Card className="mx-auto w-80">
          <CallForm call={data} />
        </Card>
      )
    }
    if (isError) {
      return <ErrorCard />
    }
    return loading()
  }

  return (
    <Section>
      <h3 className="mb-6 text-center text-h3 font-semibold">{`Call #${id}`}</h3>
      {getContent()}
    </Section>
  )
}

export default CallSection
