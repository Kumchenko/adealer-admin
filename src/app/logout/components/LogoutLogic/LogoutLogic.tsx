'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store'
import api from '@/services'
import { axiosLogout } from '@/utils/axios'

const LogoutLogic = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
        axiosLogout()
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
