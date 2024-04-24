import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/Authorization'

import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const cookieStore = cookies()

    cookieStore.set(ACCESS_TOKEN_KEY, '', { httpOnly: true, maxAge: 0 })
    cookieStore.set(REFRESH_TOKEN_KEY, '', { httpOnly: true, maxAge: 0 })

    return new Response()
}
