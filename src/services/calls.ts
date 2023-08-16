import { CallData, CallStats, GetCallsArgs, ListResponse } from '@/interfaces'
import api from '.'

const callsApi = api.injectEndpoints({
    endpoints: build => ({
        getCalls: build.query<ListResponse<CallData>, Partial<GetCallsArgs>>({
            query: ({ from, to, apply, ...params }) => ({
                url: `/auth/callmes/`,
                params: {
                    from: from ? new Date(from).toISOString() : undefined,
                    to: to ? new Date(to).toISOString() : undefined,
                    ...params,
                },
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Calls' as const, id })),
                          { type: 'Calls', id: 'PARTIAL_LIST' },
                      ]
                    : [{ type: 'Calls', id: 'PARTIAL_LIST' }],
        }),
        getCallStats: build.query<CallStats, void>({
            query: () => ({
                url: `/auth/callmes/stats`,
            }),
        }),
        updateCall: build.mutation<CallData, Partial<CallData> & Pick<CallData, 'id'>>({
            query: ({ id, created, checked, ...data }) => ({
                url: `/auth/callmes/callme/${id}`,
                method: 'PATCH',
                data: {
                    created: created ? new Date(created).toISOString() : undefined,
                    checked: checked ? new Date(checked).toISOString() : undefined,
                    ...data,
                },
            }),
            invalidatesTags: (result, error, { id }) =>
                result ? [{ type: 'Calls', id }] : [{ type: 'Calls', id: 'PARTIAL_LIST' }],
        }),
        deleteCall: build.mutation<CallData, number>({
            query: id => ({
                url: `/auth/callmes/callme/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Calls', id },
                { type: 'Calls', id: 'PARTIAL_LIST' },
            ],
        }),
    }),
})

export const { useGetCallsQuery, useGetCallStatsQuery, useUpdateCallMutation, useDeleteCallMutation } = callsApi
