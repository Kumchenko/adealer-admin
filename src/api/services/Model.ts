import { client } from '../client'
import { EApiEntity } from '../models/Generic'
import { IModel } from 'adealer-types'

const entity = EApiEntity.MODEL

export class ModelService {
    getMany = async () => (await client<IModel[]>(`/${entity}`)).data
}
