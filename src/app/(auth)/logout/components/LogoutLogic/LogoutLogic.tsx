'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch } from '@/stores'
import api from '@/services'
import { axiosLogout } from '@/utils/axios'
import Api from '@/api'

const LogoutLogic = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    Api.Employee.logout()
      .then(() => {
        dispatch(api.util.resetApiState())
      })
      .then(() => {
        router.push('/login')
      })
  }, [])

  return <div className="hidden"></div>
}

export default LogoutLogic
