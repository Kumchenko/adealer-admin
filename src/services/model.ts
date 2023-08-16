import api from '.'

const modelApi = api.injectEndpoints({
    endpoints: build => ({
        getModels: build.query<string[], void>({
            query: () => ({
                url: `/model/`,
            }),
        }),
    }),
})

export const { useGetModelsQuery } = modelApi
