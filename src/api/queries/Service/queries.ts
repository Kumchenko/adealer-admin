import { Api } from '@/api/Api'
import { IServiceGetMany } from '@/api/models/Service'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const ServiceKeys = {
    all: [{ scope: EApiEntity.SERVICE }] as const,
    lists: () => [{ ...ServiceKeys.all[0], entity: 'list' }] as const,
    list: (filters: IServiceGetMany) => [{ ...ServiceKeys.lists()[0], filters }] as const,
    details: () => [{ ...ServiceKeys.all[0], entity: 'detail' }] as const,
    detail: (id: string) => [{ ...ServiceKeys.details()[0], id }] as const,
}

export const useServices = (filters: IServiceGetMany = {}) =>
    useQuery({
        queryKey: ServiceKeys.list(filters),
        queryFn: ({ queryKey }) => Api.Service.getMany(queryKey[0].filters),
    })
