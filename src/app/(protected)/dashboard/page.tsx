import Link from 'next/link'

const Dashboard = () => {
    return (
        <div className="flex justify-center p-20">
            <Link href="/login">Login</Link>
            <Link href="/logout">Logout</Link>
        </div>
    )
}

export default Dashboard
