import { redirect } from 'next/navigation'

export default function Home() {
    const isLogged = false
    isLogged ? null : redirect('/login')
    return (
        <main>
            <h1>You are not logged</h1>
        </main>
    )
}
