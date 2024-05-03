'use client'
import { asidePoints } from '@/constants'
import { Endpoint } from '@/interfaces'
import { Dispatch, SetStateAction, createContext } from 'react'

type SidebarContextType = {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  endpoints: Endpoint[]
}

const SidebarContext = createContext<SidebarContextType>({
  open: false,
  endpoints: asidePoints,
})

export const SidebarProvider = SidebarContext.Provider
export default SidebarContext
