import { ETimeframe } from 'adealer-types'
import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

type DashboardFiltersStoreState = {
  opened: boolean
  timeframe: ETimeframe
}

type DashboardFiltersActions = {
  setValue: <K extends keyof DashboardFiltersStoreState, T extends DashboardFiltersStoreState[K]>(
    key: K,
    value: T,
  ) => void
  resetValues: () => void
}

type DashboardFiltersStore = DashboardFiltersStoreState & DashboardFiltersActions

export const DashboardFiltersStoreName = 'date-filters-store'

const defaultValues: DashboardFiltersStoreState = {
  timeframe: ETimeframe.WEEK,
  opened: false,
}

export const useDashboardFiltersStore = create(
  persist(
    devtools<DashboardFiltersStore>((set, get) => ({
      ...defaultValues,

      setValue: (key, value) => set({ [key]: value }),
      resetValues: () => set(defaultValues),
    })),
    {
      name: DashboardFiltersStoreName,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
