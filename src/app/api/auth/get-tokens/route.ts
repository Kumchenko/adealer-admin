import { ACCESS_TOKEN_KEY } from '@/constants/Authorization'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = cookies()

  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value

  return NextResponse.json({ accessToken })
}
