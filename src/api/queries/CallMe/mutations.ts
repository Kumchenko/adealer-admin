import { Api } from '@/api/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CallMeKeys } from './queries'
import { ICallMe, ICallMeUpdate, IPaginated } from 'adealer-types'
import { toast } from 'sonner'

export const useUpdateCallMe = (id: string = '') => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updatedCall: ICallMeUpdate) => Api.CallMe.update(id, updatedCall),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CallMeKeys.lists() })
      queryClient.invalidateQueries({ queryKey: CallMeKeys.detail(id) })
    },
    onError: () => {
      toast.error('Error', {
        description: `An error occured during Call №${id} updating`,
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
    onError: () => {
      toast.error('Error', {
        description: `An error occured during Call №${id} deletion`,
      })
    },
    onSuccess: data => {
      toast.success('Deleted', {
        description: `Call №${data.id} successfully deleted`,
      })
    },
  })
}
