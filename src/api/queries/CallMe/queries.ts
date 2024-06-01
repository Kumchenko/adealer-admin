import { Api } from '@/api/Api'
import { ICallMe, ICallMesGetQuery, ICallMesGetStatsQuery, IPaginated } from 'adealer-types'
import { EApiEntity } from '@/api/models/Generic'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'

export const CallMeKeys = {
  all: [{ scope: EApiEntity.CALLME }] as const,
  lists: () => [{ ...CallMeKeys.all[0], entity: 'list' }] as const,
  list: (filters: ICallMesGetQuery) => [{ ...CallMeKeys.lists()[0], filters }] as const,
  details: () => [{ ...CallMeKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...CallMeKeys.details()[0], id }] as const,
  statistics: () => [{ ...CallMeKeys.all[0], entity: 'statistics' }] as const,
  statistic: (filters: ICallMesGetStatsQuery) => [{ ...CallMeKeys.statistics()[0], filters }] as const,
}

export const useCallMes = (filters: ICallMesGetQuery = {}) =>
  useQuery({
    queryKey: CallMeKeys.list(filters),
    queryFn: ({ queryKey }) => Api.CallMe.getMany(queryKey[0].filters),
    placeholderData: keepPreviousData,
  })

export const useCallMesStatistics = (filters: ICallMesGetStatsQuery = {}) =>
  useQuery({
    queryKey: CallMeKeys.statistic(filters),
    queryFn: ({ queryKey }) => Api.CallMe.getStats(queryKey[0].filters),
    placeholderData: keepPreviousData,
  })

export const useCallMe = (id: string = '') => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: CallMeKeys.detail(id),
    queryFn: () => Api.CallMe.getById(id),
    enabled: !!id,
    initialData: () => {
      const cache = queryClient.getQueriesData<IPaginated<ICallMe>>({ queryKey: CallMeKeys.lists() })
      const cachedEntries = cache
        .map(cacheEntry => cacheEntry[1]?.data.find(callMe => `${callMe.id}` == id))
        .filter(Boolean)
      return cachedEntries[0]
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(CallMeKeys.lists())?.dataUpdatedAt,
  })
}
