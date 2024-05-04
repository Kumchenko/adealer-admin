'use client'

import Card from '../Card/Card'
import { Button } from '../ui/button'
import { ErrorCardProps } from './interfaces'
import { useRouter } from 'next/navigation'

const ErrorCard = ({ reset }: ErrorCardProps) => {
  const router = useRouter()
  return (
    <Card className="mx-auto my-6 w-60 p-4 sm:w-80">
      <h5 className="text-center text-h5">Something went wrong!</h5>
      <div className="mt-2 flex justify-center">
        <Button variant="destructive" onClick={() => (reset ? reset() : router.refresh())}>
          Retry
        </Button>
      </div>
    </Card>
  )
}

export default ErrorCard
