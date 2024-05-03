'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Api from '@/api'
import { useQueryClient } from '@tanstack/react-query'

const LogoutLogic = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  useEffect(() => {
    Api.Employee.logout().then(() => {
      queryClient.clear()
      router.push('/login')
    })
  }, [queryClient, router])

  return <div className="hidden"></div>
}

export default LogoutLogic
