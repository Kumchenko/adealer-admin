import { IEmployeeAuthorization, IEmployeeLogin } from 'adealer-types'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, accessTokenMaxAge, refreshTokenMaxAge } from '@/constants/Authorization'
import axios from 'axios'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const cookieStore = cookies()
    const { login, password } = (await req.json()) as IEmployeeLogin

    const {
        data: { id, accessToken, refreshToken },
    } = await axios.post<IEmployeeAuthorization>(`${process.env.NEXT_PUBLIC_API}/api/employee/login`, {
        login,
        password,
    })

    cookieStore.set(ACCESS_TOKEN_KEY, accessToken, { httpOnly: true, maxAge: accessTokenMaxAge })
    cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, { httpOnly: true, maxAge: refreshTokenMaxAge })

    return NextResponse.json({ id, login })
}
