import { client } from '../client'
import { EApiEntity } from '../models/Generic'
import { IModel } from '../models/Model'

const entity = EApiEntity.MODEL

export class ModelService {
    getMany = async () => (await client<IModel[]>(`/${entity}`)).data
}
