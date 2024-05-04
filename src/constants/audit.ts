import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { EActionMethod, EActionSortByField } from 'adealer-types'

export const AuditPerPageOptions = [5, 10, 15, 20, 25] as const

export const AuditSortFieldKeys = Object.values(EActionSortByField)

export const AuditMethodOptions = Object.values(EActionMethod)

export const AuditSortFields = AuditSortFieldKeys.map(value => ({
  title: capitalizeFirstLetter(value),
  value,
}))
