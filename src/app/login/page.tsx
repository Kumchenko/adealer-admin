import { Metadata } from 'next'
import LoginSection from './components/LoginSection/LoginSection'

export const metadata: Metadata = {
    title: 'Login Page – AppleDealer Control',
    description: 'AppleDealer managing system for handling orders and calls.',
}

export default function Login() {
    return (
        <main>
            <LoginSection />
        </main>
    )
}
