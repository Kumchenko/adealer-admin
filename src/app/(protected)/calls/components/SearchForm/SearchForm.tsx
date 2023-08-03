import Card from '@/components/Card/Card'
import { FormInput, FormRadio, FormCheckbox } from '@/components/Form'

const SearchForm = ({ className }: { className?: string }) => {
    return (
        <Card
            className={`${className} grid grid-cols-12 items-center justify-items-center gap-x-4 gap-y-2 bg-violet p-4`}
        >
            <FormInput className="col-span-12 w-full sm:col-span-4" name="id" type="text" placeholder="ID" />
            <FormInput className="col-span-12 w-full sm:col-span-4" name="name" type="text" placeholder="Name" />
            <FormInput className="col-span-12 w-full sm:col-span-4" name="tel" type="text" placeholder="Tel" />
            <div className="col-span-12 flex gap-x-2 max-md:order-1 sm:col-span-6 md:col-span-3 md:flex-col">
                <FormRadio name="filter" label="All" value="all" />
                <FormRadio name="filter" label="Created" value="created" />
                <FormRadio name="filter" label="Checked" value="checked" />
            </div>
            <FormInput
                className="col-span-12 w-full sm:col-span-6 md:col-span-3"
                name="from"
                label="From"
                type="datetime-local"
            />
            <FormInput
                className="col-span-12 w-full sm:col-span-6 md:col-span-3"
                name="to"
                label="To"
                type="datetime-local"
            />
            <FormCheckbox className="col-span-12 sm:col-span-6 md:col-span-3" name="apply" label="For Filter date" />
        </Card>
    )
}

export default SearchForm
