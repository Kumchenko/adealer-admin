import { authClient } from '../client'
import { EApiEntity } from '../models/Generic'
import { ICallMe, ICallMeGetMany } from '../models/CallMe'

const entity = EApiEntity.CALLME

export class CallMeService {
    getMany = async (params: ICallMeGetMany) => (await authClient<ICallMe[]>(`/${entity}`, { params })).data
}
