import { clearEmptyParams } from '@/utils/clearEmptyParams'
import { logoutRedirect } from '@/utils/logoutRedirect'
import { Mutex } from 'async-mutex'
import axios, { AxiosError } from 'axios'
import { IEmployeeTokens } from './models/Employee'

const getInternalClient = () => {
    const client = axios.create({
        baseURL: `/api`,
        timeout: 1000 * 60,
        withCredentials: true,
    })
    return client
}

const getClient = () => {
    const client = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
        timeout: 1000 * 60,
        withCredentials: true,
    })
    return client
}

const getAuthClient = () => {
    const client = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API}/api/auth`,
        timeout: 1000 * 60,
        withCredentials: true,
    })

    const mutex = new Mutex()

    client.interceptors.request.use(async req => {
        req.params = clearEmptyParams(req.params)

        // Skip next logic if already token is assigned to interceptor
        if (req.headers['Authorization']) return req

        // Retrieve and add Auth token to interceptor
        const {
            data: { accessToken },
        } = await internalClient<IEmployeeTokens>('/auth/get-tokens')

        req.headers['Authorization'] = `Bearer ${accessToken}`

        return req
    })

    // TODO: Handle unauth
    // client.interceptors.response.use(
    //     response => response,
    //     async (error: AxiosError) => {
    //         // Catch 401 Error
    //         if (error.response?.status === 401 && !error.config?.retry) {
    //             // Saving initial request config
    //             const config = error.config
    //             if (!mutex.isLocked()) {
    //                 const release = await mutex.acquire()

    //                 // Try to refresh tokens
    //                 try {
    //                     await internalClient('/auth/refresh')
    //                 } catch (e) {
    //                     logoutRedirect()
    //                     return Promise.reject(e)
    //                 } finally {
    //                     release()
    //                 }
    //             } else {
    //                 // If locked when reauth - error, else - wait for unlock
    //                 if (config?.url === '/employee/refresh') {
    //                     return Promise.reject(error)
    //                 } else {
    //                     await mutex.waitForUnlock()
    //                 }
    //             }

    //             // Try to retry request
    //             try {
    //                 // Retry request
    //                 if (config) {
    //                     config.retry = true
    //                     return await apiClient(config)
    //                 } else return Promise.reject(error)
    //             } catch (e) {
    //                 logoutRedirect()
    //                 return Promise.reject(e)
    //             }
    //         }
    //         return Promise.reject(error)
    //     },
    // )

    return client
}

export const internalClient = getInternalClient()
export const client = getClient()
export const authClient = getAuthClient()
