import { client } from '../client'
import { EApiEntity } from '../models/Generic'
import { IService, IServiceGetMany } from '../models/Service'

const entity = EApiEntity.SERVICE

export class ServiceService {
    getMany = async ({ modelId, componentId, qualityId }: IServiceGetMany) =>
        (await client<IService[]>(`/${entity}`, { params: { modelId, componentId, qualityId } })).data
}
