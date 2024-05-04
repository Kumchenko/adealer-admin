import { Metadata } from 'next'
import EmployeesSection from './components/EmployeesSection'

export const metadata: Metadata = {
  title: 'Employees',
  description: "Employees of ADealer's managing system",
}

const page = () => {
  return <EmployeesSection />
}

export default page
