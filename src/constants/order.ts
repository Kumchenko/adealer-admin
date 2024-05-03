import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { toOptions } from '@/utils/toOptions'
import { EOrderFilter, EOrderSortByField, EStatus } from 'adealer-types'

export const OrdersPerPageOptions = [6, 12, 18, 24, 30]

export const OrderStatuses = Object.values(EStatus)

export const OrderStatusOptions = OrderStatuses.map(value => ({
  title: capitalizeFirstLetter(value.toLocaleLowerCase()),
  value,
}))

export const OrderFilters = toOptions(EOrderFilter)

export const OrderSortFieldKeys = Object.values(EOrderSortByField)

export const OrderSortFields = OrderSortFieldKeys.map(value => ({
  title: capitalizeFirstLetter(value.toLocaleLowerCase()),
  value,
}))
