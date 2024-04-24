import { Api } from '@/api/Api'
import { IOrderGetMany } from '@/api/models/Order'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const OrderKeys = {
    all: [{ scope: EApiEntity.ORDER }] as const,
    lists: () => [{ ...OrderKeys.all[0], entity: 'list' }] as const,
    list: (filters: IOrderGetMany) => [{ ...OrderKeys.lists()[0], filters }] as const,
    details: () => [{ ...OrderKeys.all[0], entity: 'detail' }] as const,
    detail: (id: string) => [{ ...OrderKeys.details()[0], id }] as const,
}

export const useOrders = (filters: IOrderGetMany = {}) =>
    useQuery({
        queryKey: OrderKeys.list(filters),
        queryFn: ({ queryKey }) => Api.Order.getMany(queryKey[0].filters),
    })
