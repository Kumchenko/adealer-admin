import { Api } from '@/api/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IEmployeeBlock } from 'adealer-types'
import { toast } from 'sonner'
import { EmployeeKeys } from './queries'

export const useBlockEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ login, block }: IEmployeeBlock) => Api.Employee.block({ login, block }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: EmployeeKeys.lists() })
    },
    onError: (err, { block, login }) => {
      toast.error('Error', {
        description: `An error occured during Employee ${login} ${block ? 'blocking' : 'unblocking'}`,
      })
    },
    onSuccess: (data, { block }) => {
      toast.success('Updated', {
        description: `Employee ${data.login} successfully ${block ? 'blocked' : 'unblocked'}`,
      })
    },
  })
}
