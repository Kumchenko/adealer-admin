import api from '.'

const componentApi = api.injectEndpoints({
    endpoints: build => ({
        getComponents: build.query<string[], string | void>({
            query: modelId => ({
                url: `/component/${modelId || ''}`,
            }),
        }),
    }),
})

export const { useGetComponentsQuery } = componentApi
