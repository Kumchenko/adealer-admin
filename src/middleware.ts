import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REFRESH_TOKEN_KEY } from './constants/Authorization'

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_KEY)?.value
  if (!refreshToken) return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  matcher: ['/dashboard', '/calls', '/calls/:path', '/orders', '/orders/:path'],
}
