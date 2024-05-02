import { Metadata } from 'next'
import CallsSection from './components/CallsSection'

export const metadata: Metadata = {
  title: 'Calls',
  description: "Managing Calls of ADealer's managing system",
}

const page = () => {
  return <CallsSection />
}

export default page
