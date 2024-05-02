import { Api } from '@/api/Api'
import { IOrdersGetQuery } from 'adealer-types'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const OrderKeys = {
  all: [{ scope: EApiEntity.ORDER }] as const,
  lists: () => [{ ...OrderKeys.all[0], entity: 'list' }] as const,
  list: (filters: IOrdersGetQuery) => [{ ...OrderKeys.lists()[0], filters }] as const,
  details: () => [{ ...OrderKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...OrderKeys.details()[0], id }] as const,
  statistics: () => [{ ...OrderKeys.all[0], entity: 'statistics' }] as const,
  statistic: (filters: any) => [{ ...OrderKeys.statistics()[0], filters }] as const,
}

export const useOrders = (filters: IOrdersGetQuery = {}) =>
  useQuery({
    queryKey: OrderKeys.list(filters),
    queryFn: ({ queryKey }) => Api.Order.getMany(queryKey[0].filters),
  })

export const useOrdersStatistics = (filters: any = {}) =>
  useQuery({
    queryKey: OrderKeys.statistic(filters),
    queryFn: () => Api.Order.getStats(),
  })
