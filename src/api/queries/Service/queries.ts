import { Api } from '@/api/Api'
import { IServicesGetQuery } from 'adealer-types'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const ServiceKeys = {
  all: [{ scope: EApiEntity.SERVICE }] as const,
  lists: () => [{ ...ServiceKeys.all[0], entity: 'list' }] as const,
  list: (filters: IServicesGetQuery) => [{ ...ServiceKeys.lists()[0], filters }] as const,
  details: () => [{ ...ServiceKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...ServiceKeys.details()[0], id }] as const,
}

export const useServices = (filters: IServicesGetQuery) =>
  useQuery({
    queryKey: ServiceKeys.list(filters),
    queryFn: ({ queryKey }) => Api.Service.getMany(queryKey[0].filters),
  })
