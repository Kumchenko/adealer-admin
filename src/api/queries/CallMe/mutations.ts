import { Api } from '@/api/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CallMeKeys } from './queries'
import { ICallMe, ICallMeUpdate, IPaginated } from 'adealer-types'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'

export const useUpdateCallMe = (id: string = '') => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updatedCall: ICallMeUpdate) => Api.CallMe.update(id, updatedCall),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CallMeKeys.lists() })
      queryClient.invalidateQueries({ queryKey: CallMeKeys.detail(id) })
    },
    onError: err => {
      toast.error('Error', {
        description: `An error occured during Call №${id} updating: ${err.message}`,
      })
    },
    onSuccess: data => {
      toast.success('Updated', {
        description: `Call №${data.id} successfully updated`,
      })
    },
  })
}

export const useDeleteCallMe = (id: string = '') => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => Api.CallMe.delete(id),
    onMutate: () => {
      queryClient.setQueriesData<IPaginated<ICallMe>>({ queryKey: CallMeKeys.lists() }, data => {
        if (!data) return data

        return {
          pagination: data.pagination,
          data: data.data.filter(item => `${item.id}` != id),
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CallMeKeys.lists() })
    },
    onError: err => {
      toast.error('Error', {
        description:
          `An error occured during Call №${id} deletion` +
          (isAxiosError<Error>(err) ? `: ${err.response?.data.message}` : ''),
      })
    },
    onSuccess: data => {
      toast.success('Deleted', {
        description: `Call №${data.id} successfully deleted`,
      })
    },
  })
}
