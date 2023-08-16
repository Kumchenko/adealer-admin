import { axiosBaseQuery } from '@/utils'
import { createApi } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
    tagTypes: ['Employee', 'Calls', 'Orders'],
})

export default api
