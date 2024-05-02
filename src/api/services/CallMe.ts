import { authClient, client } from '../client'
import { EApiEntity } from '../models/Generic'
import { ICallMe, ICallMeCreate, ICallMeStatistics, ICallMeUpdate, ICallMesGetQuery, IPaginated } from 'adealer-types'

const entity = EApiEntity.CALLME

export class CallMeService {
  getMany = async (params: ICallMesGetQuery) => (await authClient<IPaginated<ICallMe>>(`/${entity}`, { params })).data
  getStats = async () => (await authClient<ICallMeStatistics>(`/${entity}/stats/`)).data
  getById = async (id: string) => (await authClient<ICallMe>(`/${entity}/${id}`)).data
  create = async (newCallMe: ICallMeCreate) => (await client.post(`/${entity}`, newCallMe)).data
  update = async (id: string, updatedCall: ICallMeUpdate) =>
    (await authClient.patch<ICallMe>(`/${entity}/${id}`, updatedCall)).data
  delete = async (id: string) => (await authClient.delete<ICallMe>(`/${entity}/${id}`)).data
}
