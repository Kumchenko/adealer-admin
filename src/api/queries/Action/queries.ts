import { Api } from '@/api/Api'
import { IActionsGetQuery } from 'adealer-types'
import { EApiEntity } from '@/api/models/Generic'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const ActionKeys = {
  all: [{ scope: EApiEntity.ACTION }] as const,
  lists: () => [{ ...ActionKeys.all[0], entity: 'list' }] as const,
  list: (filters: IActionsGetQuery) => [{ ...ActionKeys.lists()[0], filters }] as const,
  details: () => [{ ...ActionKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...ActionKeys.details()[0], id }] as const,
}

export const useActions = (filters: IActionsGetQuery = {}) =>
  useQuery({
    queryKey: ActionKeys.list(filters),
    queryFn: ({ queryKey }) => Api.Action.getMany(queryKey[0].filters),
    placeholderData: keepPreviousData,
  })
