import { authClient } from '../client'
import { EApiEntity } from '../models/Generic'
import { IOrder, IOrderStatistics, IOrdersGetQuery, IPaginated } from 'adealer-types'

const entity = EApiEntity.ORDER

export class OrderService {
  getMany = async (params: IOrdersGetQuery) => (await authClient<IPaginated<IOrder>>(`/${entity}`, { params })).data
  getStats = async () => (await authClient<IOrderStatistics>(`/${entity}/stats/`)).data
}
