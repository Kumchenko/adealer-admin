import { authClient, client } from '../client'
import { EApiEntity } from '../models/Generic'
import {
  IOrderCreate,
  IOrderRead,
  IOrderStatistics,
  IOrderUpdate,
  IOrdersGetQuery,
  IOrdersGetStatsQuery,
  IPaginated,
} from 'adealer-types'

const entity = EApiEntity.ORDER

export class OrderService {
  getMany = async (params: IOrdersGetQuery) => (await authClient<IPaginated<IOrderRead>>(`/${entity}`, { params })).data
  getStats = async (params: IOrdersGetStatsQuery) =>
    (await authClient<IOrderStatistics>(`/${entity}/stats/`, { params })).data
  getById = async (id: string) => (await authClient<IOrderRead>(`/${entity}/${id}`)).data
  create = async (newOrder: IOrderCreate) => (await client.post<IOrderRead>(`/${entity}`, newOrder)).data
  update = async (id: string, updatedOrder: IOrderUpdate) =>
    (await authClient.patch<IOrderRead>(`/${entity}/${id}`, updatedOrder)).data
  delete = async (id: string) => (await authClient.delete<IOrderRead>(`/${entity}/${id}`)).data
}
