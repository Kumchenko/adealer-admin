import { Metadata } from 'next'
import DashboardSection from './components/DashboardSection/DashboardSection'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: "Summary information about Orders and Calls in ADealer's managing system",
}

const Dashboard = () => {
  return <DashboardSection />
}

export default Dashboard
