import { GetOrdersArgs, ListResponse, OrderData, OrderStats, PatchOrderArgs } from '@/interfaces'
import api from '.'

const orderApi = api.injectEndpoints({
    endpoints: build => ({
        getOrders: build.query<ListResponse<OrderData>, Partial<GetOrdersArgs>>({
            query: ({ from, to, ...params }) => ({
                url: `/auth/orders/`,
                params: {
                    from: from ? new Date(from).toISOString() : undefined,
                    to: to ? new Date(to).toISOString() : undefined,
                    ...params,
                },
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({ type: 'Orders' as const, id })),
                          { type: 'Orders', id: 'PARTIAL_LIST' },
                      ]
                    : [{ type: 'Orders', id: 'PARTIAL_LIST' }],
        }),
        getOrderStats: build.query<OrderStats, void>({
            query: () => ({
                url: `/auth/orders/stats`,
            }),
        }),
        getOrder: build.query<OrderData, number>({
            query: id => ({
                url: `/auth/orders/order/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Orders', id }],
        }),
        updateOrder: build.mutation<OrderData, Partial<PatchOrderArgs>>({
            query: ({ id, ...data }) => ({
                url: `/auth/orders/order/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Orders', id },
                { type: 'Orders', id: 'PARTIAL_LIST' },
            ],
        }),
        deleteOrder: build.mutation<OrderData, number>({
            query: id => ({
                url: `/auth/orders/order/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Orders', id: 'PARTIAL_LIST' }],
        }),
    }),
})

export const {
    useGetOrdersQuery,
    useGetOrderStatsQuery,
    useGetOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi
