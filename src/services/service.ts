import { GetServicesArgs, ServiceData } from '@/interfaces'
import api from '.'

const serviceApi = api.injectEndpoints({
    endpoints: build => ({
        getServices: build.query<ServiceData[], GetServicesArgs>({
            query: params => ({
                url: `/service`,
                params,
            }),
        }),
    }),
})

export const { useGetServicesQuery } = serviceApi
