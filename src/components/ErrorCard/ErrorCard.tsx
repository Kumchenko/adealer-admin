import Card from '../Card/Card'
import Button from '../Button/Button'
import { DesignColor } from '@/constants'
import { ErrorCardProps } from './interfaces'

const ErrorCard = ({ reset }: ErrorCardProps) => {
    return (
        <Card className="mx-auto my-6 w-60 p-4 sm:w-80">
            <h5 className="text-center text-h5">Something went wrong!</h5>
            <Button className="mx-auto mt-2" color={DesignColor.Red} onClick={() => reset()}>
                Retry
            </Button>
        </Card>
    )
}

export default ErrorCard
