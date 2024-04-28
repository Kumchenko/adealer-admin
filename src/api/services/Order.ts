import { authClient } from '../client'
import { EApiEntity } from '../models/Generic'
import { IOrder, IOrdersGetQuery } from 'adealer-types'

const entity = EApiEntity.ORDER

export class OrderService {
    getMany = async (params: IOrdersGetQuery) => (await authClient<IOrder[]>(`/${entity}`, { params })).data
}
