import { Api } from '@/api/Api'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const EmployeeKeys = {
    all: [{ scope: EApiEntity.COMPONENT }] as const,
    lists: () => [{ ...EmployeeKeys.all[0], entity: 'list' }] as const,
    list: () => [{ ...EmployeeKeys.lists()[0], filters: {} }] as const,
    details: () => [{ ...EmployeeKeys.all[0], entity: 'detail' }] as const,
    detail: (id: string) => [{ ...EmployeeKeys.details()[0], id }] as const,
}

export const useMyEmployee = () =>
    useQuery({
        queryKey: EmployeeKeys.detail('me'),
        queryFn: Api.Employee.info,
    })
