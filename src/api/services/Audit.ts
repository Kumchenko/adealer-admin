import { authClient } from '../client'
import { IAction, IActionsGetQuery, IPaginated } from 'adealer-types'
import { EApiEntity } from '../models/Generic'

const entity = EApiEntity.ACTION

export class ActionService {
  getMany = async (params: IActionsGetQuery) => (await authClient<IPaginated<IAction>>(`/${entity}`, { params })).data
}
