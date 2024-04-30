import { IEmployeeAuthorization } from 'adealer-types'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, accessTokenMaxAge, refreshTokenMaxAge } from '@/constants/Authorization'
import axios from 'axios'

import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value

  const { data: tokens } = await axios.post<IEmployeeAuthorization>(
    `${process.env.NEXT_PUBLIC_API}/api/employee/refresh`,
    {
      refreshToken,
    },
  )

  cookieStore.set(ACCESS_TOKEN_KEY, tokens.accessToken, { httpOnly: true, maxAge: accessTokenMaxAge })
  cookieStore.set(REFRESH_TOKEN_KEY, tokens.refreshToken, { httpOnly: true, maxAge: refreshTokenMaxAge })

  return new Response()
}
