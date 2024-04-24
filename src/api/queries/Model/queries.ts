import { Api } from '@/api/Api'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const ModelKeys = {
    all: [{ scope: EApiEntity.MODEL }] as const,
    lists: () => [{ ...ModelKeys.all[0], entity: 'list' }] as const,
    list: () => [{ ...ModelKeys.lists()[0], filters: {} }] as const,
    details: () => [{ ...ModelKeys.all[0], entity: 'detail' }] as const,
    detail: (id: string) => [{ ...ModelKeys.details()[0], id }] as const,
}

export const useModels = () =>
    useQuery({
        queryKey: ModelKeys.list(),
        queryFn: Api.Model.getMany,
    })
