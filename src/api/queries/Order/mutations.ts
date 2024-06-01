import { Api } from '@/api/Api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrderKeys } from './queries'
import { IOrderRead, IOrderUpdate, IPaginated } from 'adealer-types'
import { toast } from 'sonner'
import { idToString } from '@/utils/idToString'
import { isAxiosError } from 'axios'

export const useUpdateOrder = (id: string = '') => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updatedOrder: IOrderUpdate) => Api.Order.update(id, updatedOrder),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: OrderKeys.lists() })
      queryClient.invalidateQueries({ queryKey: OrderKeys.detail(id) })
    },
    onError: err => {
      toast.error('Error', {
        description: `An error occured during Order #${idToString(parseInt(id))} updating`,
      })
    },
    onSuccess: data => {
      toast.success('Updated', {
        description: `Order #${idToString(data.id)} successfully updated`,
      })
    },
  })
}

export const useDeleteOrder = (id: string = '') => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => Api.Order.delete(id),
    onMutate: () => {
      queryClient.setQueriesData<IPaginated<IOrderRead>>({ queryKey: OrderKeys.lists() }, data => {
        if (!data) return data

        return {
          pagination: data.pagination,
          data: data.data.filter(item => `${item.id}` != id),
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: OrderKeys.lists() })
    },
    onError: err => {
      toast.error('Error', {
        description:
          `An error occured during Order #${idToString(parseInt(id))} deletion` +
          (isAxiosError<Error>(err) ? `: ${err.response?.data.message}` : ''),
      })
    },
    onSuccess: data => {
      toast.success('Deleted', {
        description: `Order #${idToString(data.id)} successfully deleted`,
      })
    },
  })
}
