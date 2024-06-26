import { Metadata } from 'next'
import CallSection from './components/CallSection/CallSection'
import { CallPageProps } from './interfaces'

export function generateMetadata({ params: { id } }: CallPageProps): Metadata {
  return {
    title: `Call #${id}`,
    description: `Managing Call #${id} `,
  }
}

const CallPage = ({ params: { id } }: CallPageProps) => {
  return <CallSection id={id} />
}

export default CallPage
