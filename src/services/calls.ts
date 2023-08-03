import { CallData, GetCallsArgs, ListResponse } from '@/interfaces'
import api from '.'

const callsApi = api.injectEndpoints({
    endpoints: build => ({
        getCalls: build.query<ListResponse<CallData>, GetCallsArgs>({
            query: ({ from, to, ...params }) => ({
                url: `/auth/callme/`,
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
        updateCall: build.mutation<CallData, Partial<CallData> & Pick<CallData, 'id'>>({
            query: ({ id, created, checked, ...data }) => ({
                url: `/auth/callme/${id}`,
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
                url: `/auth/callme/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Calls', id },
                { type: 'Calls', id: 'PARTIAL_LIST' },
            ],
        }),
    }),
})

export const { useGetCallsQuery, useUpdateCallMutation, useDeleteCallMutation } = callsApi
