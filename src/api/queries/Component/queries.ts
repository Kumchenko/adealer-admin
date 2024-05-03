import { Api } from '@/api/Api'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'
import { IComponentsGetQuery } from 'adealer-types'

export const ComponentKeys = {
  all: [{ scope: EApiEntity.COMPONENT }] as const,
  lists: () => [{ ...ComponentKeys.all[0], entity: 'list' }] as const,
  list: (filters: IComponentsGetQuery) => [{ ...ComponentKeys.lists()[0], filters }] as const,
  details: () => [{ ...ComponentKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...ComponentKeys.details()[0], id }] as const,
}

export const useComponents = (filters: IComponentsGetQuery = {}) =>
  useQuery({
    queryKey: ComponentKeys.list(filters),
    queryFn: ({ queryKey }) => Api.Component.getMany(queryKey[0].filters),
  })
