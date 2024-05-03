import { client } from '../client'
import { IComponent, IComponentsGetQuery } from 'adealer-types'
import { EApiEntity } from '../models/Generic'

const entity = EApiEntity.COMPONENT

export class ComponentService {
  getMany = async ({ modelId }: IComponentsGetQuery) =>
    (await client<IComponent[]>(`/${entity}`, { params: { modelId } })).data
}
