import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type DateFiltersStoreState = {
  from: string
  to: string
}

type DateFiltersActions = {
  setValue: <K extends keyof DateFiltersStoreState, T extends DateFiltersStoreState[K]>(key: K, value: T) => void
  resetValues: () => void
}

type DateFiltersStore = DateFiltersStoreState & DateFiltersActions

export const DateFiltersStoreName = 'date-filters-store'

const defaultValues = {
  from: '',
  to: '',
}

export const useDateFiltersStore = create(
  persist(
    devtools<DateFiltersStore>((set, get) => ({
      ...defaultValues,

      setValue: (key, value) => set({ [key]: value }),
      resetValues: () => set(defaultValues),
    })),
    {
      name: DateFiltersStoreName,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
