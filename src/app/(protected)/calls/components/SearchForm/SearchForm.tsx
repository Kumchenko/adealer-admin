import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import { FormInput, FormRadio, FormCheckbox } from '@/components/Form'
import { DesignColor, callFilters } from '@/constants'
import { useFormikContext } from 'formik'
import { memo } from 'react'

const SearchForm = ({ className }: { className?: string }) => {
    const { resetForm } = useFormikContext()
    return (
        <Card className={`${className} grid grid-cols-12 items-center justify-items-center gap-x-4 gap-y-2 bg-violet`}>
            <FormInput className="col-span-12 w-full sm:col-span-4" name="id" type="text" id="id" placeholder="ID" />
            <FormInput
                className="col-span-12 w-full sm:col-span-4"
                name="name"
                type="text"
                id="name"
                placeholder="Name"
            />
            <FormInput className="col-span-12 w-full sm:col-span-4" name="tel" type="text" id="tel" placeholder="Tel" />
            <div className="col-span-12 row-span-2 flex gap-x-2 max-md:order-1 sm:col-span-6 md:col-span-3 md:flex-col">
                {callFilters.map(({ title, value }) => (
                    <FormRadio name="filter" key={value} id={value} label={title} value={value} />
                ))}
            </div>
            <FormInput
                className="col-span-12 row-span-2 w-full sm:col-span-6 md:col-span-3"
                name="from"
                id="from"
                label="From"
                type="datetime-local"
            />
            <FormInput
                className="col-span-12 row-span-2 w-full sm:col-span-6 md:col-span-3"
                name="to"
                id="to"
                label="To"
                type="datetime-local"
            />
            <FormCheckbox
                className="order-2 col-span-12 sm:col-span-6 md:col-span-3"
                name="apply"
                id="apply"
                label="For Filter date"
            />
            <Button
                className="order-2 col-span-12 sm:col-span-6 md:col-span-3"
                color={DesignColor.Red}
                onClick={() => resetForm()}
            >
                Clear
            </Button>
        </Card>
    )
}

export default memo(SearchForm)
