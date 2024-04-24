import { authClient } from '../client'
import { EApiEntity } from '../models/Generic'
import { IOrder, IOrderGetMany } from '../models/Order'

const entity = EApiEntity.ORDER

export class OrderService {
    getMany = async (params: IOrderGetMany) => (await authClient<IOrder[]>(`/${entity}`, { params })).data
}
