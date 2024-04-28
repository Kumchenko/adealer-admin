import { authClient } from '../client'
import { EApiEntity } from '../models/Generic'
import { ICallMe, ICallMesGetQuery } from 'adealer-types'

const entity = EApiEntity.CALLME

export class CallMeService {
    getMany = async (params: ICallMesGetQuery) => (await authClient<ICallMe[]>(`/${entity}`, { params })).data
}
