import { Api } from '@/api/Api'
import { IComponentGetMany } from '@/api/models/Component'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const ComponentKeys = {
    all: [{ scope: EApiEntity.COMPONENT }] as const,
    lists: () => [{ ...ComponentKeys.all[0], entity: 'list' }] as const,
    list: (filters: IComponentGetMany) => [{ ...ComponentKeys.lists()[0], filters }] as const,
    details: () => [{ ...ComponentKeys.all[0], entity: 'detail' }] as const,
    detail: (id: string) => [{ ...ComponentKeys.details()[0], id }] as const,
}

export const useComponents = (filters: IComponentGetMany = {}) =>
    useQuery({
        queryKey: ComponentKeys.list(filters),
        queryFn: ({ queryKey }) => Api.Component.getMany(queryKey[0].filters),
    })
