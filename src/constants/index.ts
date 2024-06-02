import { toOptions } from '@/utils/toOptions'

export * from './asidePoints'
export * from './order'
export * from './calls'
export * from './audit'

export const logoutTimeout = 0 // 0s

export enum Sort {
  Asc = 'asc',
  Desc = 'desc',
}

export const SortOptions = toOptions(Sort)

export const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
