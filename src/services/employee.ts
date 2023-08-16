import { EmployeeData, LoginEmployeeArgs } from '@/interfaces'
import api from '.'

const employeeApi = api.injectEndpoints({
    endpoints: build => ({
        loginEmployee: build.mutation<EmployeeData, LoginEmployeeArgs>({
            query: data => ({
                url: '/employee/login',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Employee'],
        }),
        getEmployee: build.query<EmployeeData, void>({
            query: () => ({
                url: '/auth/employee/info',
            }),
            providesTags: ['Employee'],
        }),
    }),
})

export const { useGetEmployeeQuery, useLoginEmployeeMutation } = employeeApi
