'use client'
import { PropsWithChildren, useState } from 'react'
import { Provider } from 'react-redux'
import store from '@/store'
import { asidePoints } from '@/constants'
import { SidebarProvider } from '@/components/Sidebar/SidebarContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const Providers = ({ children }: PropsWithChildren) => {
    // Sidebar open state
    const [open, setOpen] = useState(false)

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <SidebarProvider value={{ open, setOpen, endpoints: asidePoints }}>{children}</SidebarProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export { Providers }
