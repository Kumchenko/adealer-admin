import { Api } from '@/api/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CallMeKeys } from './queries'
import { ICallMe, IPaginated } from 'adealer-types'

export const useUpdateCallMe = (id: string = '') => {
  const queryClient = useQueryClient()
  return useMutation({})
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
      queryClient.invalidateQueries({ queryKey: CallMeKeys.detail(id) })
    },
  })
}
