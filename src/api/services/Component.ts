import { client } from '../client'
import { IComponent, IComponentGetMany } from '../models/Component'
import { EApiEntity } from '../models/Generic'

const entity = EApiEntity.COMPONENT

export class ComponentService {
    getMany = async ({ modelId }: IComponentGetMany) =>
        (await client<IComponent[]>(`/auth/${entity}` + modelId ? `/${modelId}` : '')).data
}
