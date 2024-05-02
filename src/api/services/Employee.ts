import { authClient, internalClient } from '../client'
import { IEmployeeData, IEmployeeLogin, IEmployeeAccess } from 'adealer-types'
import { EApiEntity } from '../models/Generic'

const entity = EApiEntity.EMPLOYEE

export class EmployeeService {
  info = async () => (await authClient(`/${entity}/info`)).data
  login = async ({ login, password }: IEmployeeLogin) =>
    (await internalClient.post<IEmployeeData>('/auth/login', { login, password })).data
  refresh = async () => (await internalClient.post<IEmployeeAccess>('/auth/refresh')).data
  logout = async () => (await internalClient.post('/auth/logout')).data
  getTokens = async () => (await internalClient<IEmployeeAccess>('/auth/get-tokens')).data
}
