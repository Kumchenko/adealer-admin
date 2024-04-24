import { client } from '../client'
import { EApiEntity } from '../models/Generic'
import { IQuality } from '../models/Quality'

const entity = EApiEntity.QUALITY

export class QualityService {
    getMany = async () => (await client<IQuality[]>(`/${entity}`)).data
}
