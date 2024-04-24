import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/Authorization'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const cookieStore = cookies()

    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value
    const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value

    return NextResponse.json({ accessToken, refreshToken })
}
