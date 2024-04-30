import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { toOptions } from '@/utils/toOptions'
import { ECallMeFilter, ECallMeSortByField } from 'adealer-types'

export const CallsPerPageOptions = [5, 10, 15, 20, 25] as const

export const CallFilters = toOptions(ECallMeFilter)

export const CallSortFieldKeys = Object.values(ECallMeSortByField)

export const CallSortFields = CallSortFieldKeys.map(value => ({
  title: capitalizeFirstLetter(value),
  value,
}))
