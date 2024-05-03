import { OrdersPerPageOptions } from '@/constants'
import { OnChangeFn, SortingState } from '@tanstack/react-table'
import { EOrderFilter, EOrderSortByField } from 'adealer-types'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type OrderFiltersStoreState = {
  id: string
  name: string
  surname: string
  tel: string
  email: string
  filter: EOrderFilter
  modelId: string
  componentId: string
  qualityId: string
  page: number
  perPage: number
  apply: boolean
  sortDesc: boolean
  sortBy: EOrderSortByField
}

type OrderFiltersActions = {
  onSortingChange: OnChangeFn<SortingState>
  setValue: <K extends keyof OrderFiltersStoreState, T extends OrderFiltersStoreState[K]>(key: K, value: T) => void
  resetValues: () => void
}

type OrderFiltersStore = OrderFiltersStoreState & OrderFiltersActions

export const OrderFiltersStoreName = 'order-filters-store'

const defaultValues: OrderFiltersStoreState = {
  id: '',
  name: '',
  surname: '',
  tel: '',
  email: '',
  modelId: '',
  componentId: '',
  qualityId: '',
  filter: EOrderFilter.All,
  page: 1,
  perPage: OrdersPerPageOptions[0],
  apply: false,
  sortDesc: false,
  sortBy: EOrderSortByField.ID,
}

export const useOrderFiltersStore = create(
  persist(
    devtools<OrderFiltersStore>((set, get) => ({
      ...defaultValues,

      onSortingChange: updater => {
        const { sortBy: oldSortBy, sortDesc: oldSortDesc } = get()
        const newValue = typeof updater === 'function' ? updater([{ id: oldSortBy, desc: oldSortDesc }]) : updater
        set({ sortBy: newValue?.[0].id as EOrderSortByField, sortDesc: newValue?.[0].desc })
      },
      setValue: (key, value) => set({ [key]: value }),
      resetValues: () => set(defaultValues),
    })),
    {
      name: OrderFiltersStoreName,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
