import { Metadata } from 'next'
import loading from '../../loading'
import LogoutLogic from './components/LogoutLogic/LogoutLogic'

export const metadata: Metadata = {
  title: 'Logging out',
}

export default function Logout() {
  return (
    <main>
      <LogoutLogic />
      {loading()}
    </main>
  )
}
