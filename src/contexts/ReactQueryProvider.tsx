import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
type Props = {
    children: React.ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})

export const ReactQueryProvider = ({children} : Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
