'use client'
import { PropsWithChildren, useState } from 'react'
import { asidePoints } from '@/constants'
import { SidebarProvider } from '@/components/Sidebar/SidebarContext'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'sonner'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error('Something went wrong', { description: error.message })
      }
    },
  }),
})

const Providers = ({ children }: PropsWithChildren) => {
  // Sidebar open state
  const [open, setOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider value={{ open, setOpen, endpoints: asidePoints }}>{children}</SidebarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { Providers }
