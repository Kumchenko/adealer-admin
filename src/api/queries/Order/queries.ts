import { Api } from '@/api/Api'
import { IOrderRead, IOrdersGetQuery, IOrdersGetStatsQuery, IPaginated } from 'adealer-types'
import { EApiEntity } from '@/api/models/Generic'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'

export const OrderKeys = {
  all: [{ scope: EApiEntity.ORDER }] as const,
  lists: () => [{ ...OrderKeys.all[0], entity: 'list' }] as const,
  list: (filters: IOrdersGetQuery) => [{ ...OrderKeys.lists()[0], filters }] as const,
  details: () => [{ ...OrderKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...OrderKeys.details()[0], id }] as const,
  statistics: () => [{ ...OrderKeys.all[0], entity: 'statistics' }] as const,
  statistic: (filters: IOrdersGetStatsQuery) => [{ ...OrderKeys.statistics()[0], filters }] as const,
}

export const useOrders = (filters: IOrdersGetQuery = {}) =>
  useQuery({
    queryKey: OrderKeys.list(filters),
    queryFn: ({ queryKey }) => Api.Order.getMany(queryKey[0].filters),
    placeholderData: keepPreviousData,
  })

export const useOrdersStatistics = (filters: IOrdersGetStatsQuery = {}) =>
  useQuery({
    queryKey: OrderKeys.statistic(filters),
    queryFn: ({ queryKey }) => Api.Order.getStats(queryKey[0].filters),
    placeholderData: keepPreviousData,
  })

export const useOrder = (id: string = '') => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: OrderKeys.detail(id),
    queryFn: () => Api.Order.getById(id),
    enabled: !!id,
    initialData: () => {
      const cache = queryClient.getQueriesData<IPaginated<IOrderRead>>({ queryKey: OrderKeys.lists() })
      const cachedEntries = cache
        .map(cacheEntry => cacheEntry[1]?.data.find(callMe => `${callMe.id}` == id))
        .filter(Boolean)
      return cachedEntries[0]
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(OrderKeys.lists())?.dataUpdatedAt,
  })
}
