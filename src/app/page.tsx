import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
    const cookieStore = cookies()
    const token = !!cookieStore.get('logged_in')
    if (token) {
        redirect('/dashboard')
    } else {
        redirect('/login')
    }
}
