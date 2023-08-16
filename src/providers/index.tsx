'use client'
import { PropsWithChildren, useState } from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
import { asidePoints } from '@/constants'
import { SidebarProvider } from '@/components/Sidebar/SidebarContext'

const Providers = ({ children }: PropsWithChildren) => {
    // Sidebar open state
    const [open, setOpen] = useState(false)

    return (
        <Provider store={store}>
            <SidebarProvider value={{ open, setOpen, endpoints: asidePoints }}>{children}</SidebarProvider>
        </Provider>
    )
}

export { Providers }
