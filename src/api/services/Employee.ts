import { authClient, internalClient } from '../client'
import { IEmployeeData, IEmployeeLogin, IEmployeeAccess, IEmployeeRead, IEmployeeBlock } from 'adealer-types'
import { EApiEntity } from '../models/Generic'

const entity = EApiEntity.EMPLOYEE

export class EmployeeService {
  info = async () => (await authClient<IEmployeeRead>(`/${entity}/info`)).data
  login = async ({ login, password }: IEmployeeLogin) =>
    (await internalClient.post<IEmployeeData>('/auth/login', { login, password })).data
  refresh = async () => (await internalClient.post<IEmployeeAccess>('/auth/refresh')).data
  logout = async () => (await internalClient.post('/auth/logout')).data
  getTokens = async () => (await internalClient<IEmployeeAccess>('/auth/get-tokens')).data
  block = async (blockData: IEmployeeBlock) =>
    (await authClient.post<IEmployeeRead>(`/${entity}/block`, blockData)).data
  getMany = async () => (await authClient<IEmployeeRead[]>(`/${entity}/all`)).data
}
