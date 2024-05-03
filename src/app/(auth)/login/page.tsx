import { Metadata } from 'next'
import LoginSection from './components/LoginSection/LoginSection'

export const metadata: Metadata = {
  title: 'Login',
  description: "Getting access to ADealer's managing system",
}

export default function Login() {
  return (
    <main>
      <LoginSection />
    </main>
  )
}
