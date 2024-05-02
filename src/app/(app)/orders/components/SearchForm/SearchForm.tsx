import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import { FormInput, FormCheckbox, FormSelect } from '@/components/Form'
import { DesignColor, orderFilterOptions } from '@/constants'
import { useGetComponentsQuery } from '@/services/component'
import { useGetModelsQuery } from '@/services/model'
import { useGetQualitiesQuery } from '@/services/quality'
import { modelIdConverter } from '@/utils/stringConverter'
import { useOptions } from '@/utils/useOptions'
import { useFormikContext } from 'formik'

const SearchForm = ({ className }: { className?: string }) => {
    // Getting models, components, qualities
    const { data: models } = useGetModelsQuery()
    const { data: components } = useGetComponentsQuery()
    const { data: qualities } = useGetQualitiesQuery()

    // Preparing objects for options
    const modelOptions = useOptions(models, modelIdConverter)
    const componentOptions = useOptions(components)
    const qualityOptions = useOptions(qualities)

    const { resetForm } = useFormikContext()

    return (
        <Card className={`${className} grid grid-cols-12 items-end justify-items-center gap-x-4 gap-y-2 bg-violet-800 p-4`}>
            <FormInput
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="id"
                type="text"
                id="id"
                placeholder="ID"
            />
            <FormSelect
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="modelId"
                id="model"
                options={modelOptions}
                placeholder="All models"
                placeholderDisabled={false}
            />
            <FormSelect
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="componentId"
                id="component"
                options={componentOptions}
                placeholder="All components"
                placeholderDisabled={false}
            />
            <FormSelect
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="qualityId"
                id="quality"
                options={qualityOptions}
                placeholder="All qualities"
                placeholderDisabled={false}
            />
            <FormInput
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="name"
                type="text"
                id="name"
                placeholder="Name"
            />
            <FormInput
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="surname"
                type="text"
                id="surname"
                placeholder="Surname"
            />
            <FormInput
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="tel"
                type="text"
                id="tel"
                placeholder="Tel"
            />
            <FormInput
                className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
                name="email"
                type="email"
                id="email"
                placeholder="Email"
            />
            <FormSelect
                className="col-span-12 row-span-2 max-md:order-1 sm:col-span-6 md:col-span-3"
                label="Filter"
                name="filter"
                id="filter"
                options={orderFilterOptions}
            />
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
                className="col-span-12 max-md:order-1 sm:col-span-6 md:col-span-3"
                name="apply"
                id="apply"
                label="Date for Filter"
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

export default SearchForm
