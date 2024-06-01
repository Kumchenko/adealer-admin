import { clearEmptyParams } from '@/utils/clearEmptyParams'
import { Mutex } from 'async-mutex'
import axios, { AxiosError } from 'axios'
import { IEmployeeAccess } from 'adealer-types'
import { Api } from './Api'
import { toast } from 'sonner'
import { logoutRedirect } from '@/utils/logoutRedirect'
import { debounce } from 'lodash'

const getInternalClient = () => {
  const client = axios.create({
    baseURL: `http://localhost:3000/api`,
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

  client.interceptors.request.use(async req => {
    req.params = clearEmptyParams(req.params)
    return req
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

  const handleLogout = debounce(async () => {
    logoutRedirect()
    toast.warning('Warning', {
      description: 'Session is expired. Logging out...',
    })
    client.defaults.headers.common['Authorization'] = undefined
  }, 5000)

  client.interceptors.request.use(async req => {
    req.params = clearEmptyParams(req.params)

    // Skip next logic if already token is assigned to interceptor
    if (req.headers['Authorization']) return req

    // Retrieve and add Auth token to interceptor
    const {
      data: { accessToken },
    } = await internalClient<IEmployeeAccess>('/auth/get-tokens')

    req.headers['Authorization'] = `Bearer ${accessToken}`
    req.headers['Accept-Language'] = 'en'

    return req
  })

  client.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      // Catch Authorization Error
      if (error.response && error.response.status === 401) {
        if (!!error.config?.retry) {
          await handleLogout()
          return Promise.reject(error)
        }

        // Saving initial request config
        const config = error.config

        // Reject if no config
        if (!config) {
          await handleLogout()
          return Promise.reject(error)
        }

        if (!mutex.isLocked()) {
          const release = await mutex.acquire()

          // Try to refresh tokens
          try {
            const { accessToken: newAccessToken } = await Api.Employee.refresh()
            if (newAccessToken) {
              // Set new access token to config and instance
              config.headers['Authorization'] = `Bearer ${newAccessToken}`
              client.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`
            } else {
              throw Error('Access token not found in session')
            }
          } catch (e) {
            await handleLogout()
            return Promise.reject(e)
          } finally {
            release()
          }
        } else {
          // Wait for unlock
          await mutex.waitForUnlock()
        }

        // Try to retry request
        config.retry = true
        return await client(config)
      }

      return Promise.reject(error)
    },
  )

  return client
}

export const internalClient = getInternalClient()
export const client = getClient()
export const authClient = getAuthClient()
