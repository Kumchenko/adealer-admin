import { client } from '../client'
import { EApiEntity } from '../models/Generic'
import { IService, IServicesGetQuery } from 'adealer-types'

const entity = EApiEntity.SERVICE

export class ServiceService {
  getMany = async ({ modelId, componentId, qualityId }: IServicesGetQuery) =>
    (await client<IService[]>(`/${entity}`, { params: { modelId, componentId, qualityId } })).data
}
