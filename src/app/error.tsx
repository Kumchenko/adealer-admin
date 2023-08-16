'use client'
import ErrorCard from '@/components/ErrorCard/ErrorCard'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return <ErrorCard reset={reset} />
}
