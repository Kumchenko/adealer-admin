import { CallsPerPageOptions } from '@/constants'
import { OnChangeFn, SortingState } from '@tanstack/react-table'
import { ECallMeFilter, ECallMeSortByField } from 'adealer-types'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type CallFiltersStoreState = {
  id: string
  name: string
  tel: string
  filter: ECallMeFilter
  page: number
  perPage: number
  apply: boolean
  sortDesc: boolean
  sortBy: ECallMeSortByField
}

type CallFiltersActions = {
  onSortingChange: OnChangeFn<SortingState>
  setValue: <K extends keyof CallFiltersStoreState, T extends CallFiltersStoreState[K]>(key: K, value: T) => void
  resetValues: () => void
}

type CallFiltersStore = CallFiltersStoreState & CallFiltersActions

export const CallFiltersStoreName = 'call-filters-store'

const defaultValues = {
  id: '',
  name: '',
  tel: '',
  filter: ECallMeFilter.All,
  page: 1,
  perPage: CallsPerPageOptions[0],
  apply: false,
  sortDesc: false,
  sortBy: ECallMeSortByField.ID,
}

export const useCallFiltersStore = create(
  persist(
    devtools<CallFiltersStore>((set, get) => ({
      ...defaultValues,

      onSortingChange: updater => {
        const { sortBy: oldSortBy, sortDesc: oldSortDesc } = get()
        const newValue = typeof updater === 'function' ? updater([{ id: oldSortBy, desc: oldSortDesc }]) : updater
        set({ sortBy: newValue?.[0].id as ECallMeSortByField, sortDesc: newValue?.[0].desc })
      },
      setValue: (key, value) => set({ [key]: value }),
      resetValues: () => set(defaultValues),
    })),
    {
      name: CallFiltersStoreName,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
