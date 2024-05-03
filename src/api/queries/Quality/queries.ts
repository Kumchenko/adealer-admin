import { Api } from '@/api/Api'
import { EApiEntity } from '@/api/models/Generic'
import { useQuery } from '@tanstack/react-query'

export const QualityKeys = {
  all: [{ scope: EApiEntity.QUALITY }] as const,
  lists: () => [{ ...QualityKeys.all[0], entity: 'list' }] as const,
  list: () => [{ ...QualityKeys.lists()[0], filters: {} }] as const,
  details: () => [{ ...QualityKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...QualityKeys.details()[0], id }] as const,
}

export const useQualities = () =>
  useQuery({
    queryKey: QualityKeys.list(),
    queryFn: Api.Quality.getMany,
  })
