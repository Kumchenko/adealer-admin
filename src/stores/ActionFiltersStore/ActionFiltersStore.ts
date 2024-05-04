import { AuditPerPageOptions } from '@/constants/audit'
import { OnChangeFn, SortingState } from '@tanstack/react-table'
import { EActionMethod, EActionSortByField } from 'adealer-types'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type ActionFiltersStoreState = {
  opened: boolean
  login: string
  method: EActionMethod | string
  page: number
  perPage: number
  sortDesc: boolean
  sortBy: EActionSortByField
}

type ActionFiltersActions = {
  onSortingChange: OnChangeFn<SortingState>
  setValue: <K extends keyof ActionFiltersStoreState, T extends ActionFiltersStoreState[K]>(key: K, value: T) => void
  resetValues: () => void
}

type ActionFiltersStore = ActionFiltersStoreState & ActionFiltersActions

export const ActionFiltersStoreName = 'action-filters-store'

const defaultValues = {
  opened: false,
  login: '',
  method: '',
  page: 1,
  perPage: AuditPerPageOptions[0],
  apply: false,
  sortDesc: false,
  sortBy: EActionSortByField.DATE,
}

export const useActionFiltersStore = create(
  persist(
    devtools<ActionFiltersStore>((set, get) => ({
      ...defaultValues,

      onSortingChange: updater => {
        const { sortBy: oldSortBy, sortDesc: oldSortDesc } = get()
        const newValue = typeof updater === 'function' ? updater([{ id: oldSortBy, desc: oldSortDesc }]) : updater
        set({ sortBy: newValue?.[0].id as EActionSortByField, sortDesc: newValue?.[0].desc })
      },
      setValue: (key, value) => set({ [key]: value }),
      resetValues: () => set(defaultValues),
    })),
    {
      name: ActionFiltersStoreName,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
