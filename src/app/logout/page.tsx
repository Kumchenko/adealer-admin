'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import loading from '../loading'
import { useAppDispatch } from '@/store'
import api from '@/services'
import { axiosLogout } from '@/utils'

export default function Logout() {
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

    return <main>{loading()}</main>
}
