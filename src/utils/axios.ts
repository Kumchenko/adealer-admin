import { AxiosBaseQuery, AxiosBaseQueryError, EmployeeData, LoginEmployeeArgs } from '@/interfaces'
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { AxiosRequestConfig } from 'axios'
import { clearEmptyParams } from './clearEmptyParams'
import { logoutRedirect } from './logoutRedirect'

declare module 'axios' {
    export interface AxiosRequestConfig {
        retry?: boolean
    }
}

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
    timeout: 1000 * 60,
    withCredentials: true,
})

const mutex = new Mutex()

axiosInstance.interceptors.request.use(
    function ({ params, ...config }) {
        return {
            params: params ? clearEmptyParams(params) : undefined,
            ...config,
        }
    },
    error => error,
)

axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        // Catch 401 Error
        if (error.response?.status === 401 && !error.config?.retry) {
            // Saving initial request config
            const config = error.config
            if (!mutex.isLocked()) {
                const release = await mutex.acquire()

                // Try to refresh tokens
                try {
                    await axiosInstance('/employee/refresh')
                } catch (e) {
                    logoutRedirect()
                    return Promise.reject(e)
                } finally {
                    release()
                }
            } else {
                // If locked when reauth - error, else - wait for unlock
                if (config?.url === '/employee/refresh') {
                    return Promise.reject(error)
                } else {
                    await mutex.waitForUnlock()
                }
            }

            // Try to retry request
            try {
                // Retry request
                if (config) {
                    config.retry = true
                    return await axiosInstance(config)
                } else return Promise.reject(error)
            } catch (e) {
                logoutRedirect()
                return Promise.reject(e)
            }
        }
        return Promise.reject(error)
    },
)

const axiosBaseQuery =
    (
        options?: AxiosBaseQuery,
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        AxiosBaseQueryError
    > =>
    async ({ url, method, data, params }) => {
        try {
            const result = await axiosInstance({
                url,
                method,
                params,
                data,
                ...options,
            })
            return {
                data: result.data,
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    error: {
                        status: e.response?.status || 400,
                        data: e.response?.data || e.message,
                    },
                }
            } else {
                return {
                    error: {
                        status: 400,
                        data: 'Unknown Fetch error',
                    },
                }
            }
        }
    }

const axiosLogout = () => axiosInstance('/employee/logout')
const axiosLogin = (loginData: LoginEmployeeArgs): Promise<AxiosResponse<EmployeeData>> =>
    axiosInstance.post('/employee/login', loginData)
const axiosEmployee = (): Promise<AxiosResponse<EmployeeData>> => axiosInstance('/auth/employee/info')

export { axiosBaseQuery, axiosInstance, axiosLogin, axiosLogout, axiosEmployee }
