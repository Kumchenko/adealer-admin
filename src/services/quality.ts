import api from '.'

const qualityApi = api.injectEndpoints({
    endpoints: build => ({
        getQualities: build.query<string[], void>({
            query: () => ({
                url: `/quality/`,
            }),
        }),
    }),
})

export const { useGetQualitiesQuery } = qualityApi
