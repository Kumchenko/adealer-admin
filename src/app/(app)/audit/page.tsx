import { Metadata } from 'next'
import AuditSection from './components/AuditSection'

export const metadata: Metadata = {
  title: 'Audit',
  description: "Audit of ADealer's managing system",
}

const page = () => {
  return <AuditSection />
}

export default page
