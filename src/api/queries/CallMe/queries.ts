import { Api } from '@/api/Api'
import { ICallMesGetQuery } from 'adealer-types'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const CallMeKeys = {
    all: [{ scope: EApiEntity.CALLME }] as const,
    lists: () => [{ ...CallMeKeys.all[0], entity: 'list' }] as const,
    list: (filters: ICallMesGetQuery) => [{ ...CallMeKeys.lists()[0], filters }] as const,
    details: () => [{ ...CallMeKeys.all[0], entity: 'detail' }] as const,
    detail: (id: string) => [{ ...CallMeKeys.details()[0], id }] as const,
}

export const useCallMes = (filters: ICallMesGetQuery = {}) =>
    useQuery({
        queryKey: CallMeKeys.list(filters),
        queryFn: ({ queryKey }) => Api.CallMe.getMany(queryKey[0].filters),
    })
