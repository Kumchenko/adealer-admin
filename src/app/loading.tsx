import Spinner from '@/components/Spinner/Spinner'

const loading = () => {
    return (
        <div className="flex justify-center p-20">
            <Spinner className="h-20 w-20" />
        </div>
    )
}

export default loading
