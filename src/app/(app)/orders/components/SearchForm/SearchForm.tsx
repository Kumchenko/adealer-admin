import { useComponents } from '@/api/queries/Component/queries'
import { useModels } from '@/api/queries/Model/queries'
import { useQualities } from '@/api/queries/Quality/queries'
import Card from '@/components/Card/Card'
import FieldCheckbox from '@/components/Field/FieldCheckbox'
import FieldInput from '@/components/Field/FieldInput'
import FieldSelect from '@/components/Field/FieldSelect'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { OrderFilters } from '@/constants'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { useOrderFiltersStore } from '@/stores/OrderFiltersStore'
import { modelIdConverter } from '@/utils/stringConverter'
import { useOptions } from '@/utils/useOptions'
import { EOrderFilter } from 'adealer-types'

const SearchForm = () => {
  const { from, to, resetValues: resetDates, setValue: setDate } = useDateFiltersStore()
  const {
    id,
    name,
    surname,
    tel,
    email,
    modelId,
    componentId,
    qualityId,
    apply,
    filter,
    onSortingChange,
    resetValues,
    setValue,
  } = useOrderFiltersStore()

  // Getting models, components, qualities
  const { data: models } = useModels()
  const { data: components } = useComponents()
  const { data: qualities } = useQualities()

  // Preparing objects for options
  const modelOptions = useOptions(models, modelIdConverter)
  const componentOptions = useOptions(components)
  const qualityOptions = useOptions(qualities)

  return (
    <Card className="px-4 py-1 shadow-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Filters</AccordionTrigger>
          <AccordionContent className="grid grid-cols-12 items-end justify-items-center gap-x-4 gap-y-2">
            <FieldInput
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              name="id"
              value={id}
              type="text"
              id="id"
              placeholder="ID"
              onChange={e => setValue('id', e.target.value)}
            />
            <FieldSelect
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              id="model"
              value={modelId}
              options={modelOptions}
              placeholder="All models"
              placeholderDisabled={false}
              onChange={e => setValue('modelId', e.target.value)}
            />
            <FieldSelect
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              id="component"
              value={componentId}
              options={componentOptions}
              placeholder="All components"
              placeholderDisabled={false}
              onChange={e => setValue('componentId', e.target.value)}
            />
            <FieldSelect
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              id="quality"
              value={qualityId}
              options={qualityOptions}
              placeholder="All qualities"
              placeholderDisabled={false}
              onChange={e => setValue('qualityId', e.target.value)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              value={name}
              type="text"
              id="name"
              placeholder="Name"
              onChange={e => setValue('name', e.target.value)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              value={surname}
              type="text"
              id="surname"
              placeholder="Surname"
              onChange={e => setValue('surname', e.target.value)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              value={tel}
              type="text"
              id="tel"
              placeholder="Tel"
              onChange={e => setValue('tel', e.target.value)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-6 lg:col-span-3"
              value={email}
              type="email"
              id="email"
              placeholder="Email"
              onChange={e => setValue('email', e.target.value)}
            />
            <FieldSelect
              className="col-span-12 row-span-2 max-md:order-1 sm:col-span-6 md:col-span-3"
              label="Filter"
              id="filter"
              value={filter}
              options={OrderFilters}
              onChange={e => setValue('filter', e.target.value as EOrderFilter)}
            />
            <FieldInput
              className="col-span-12 row-span-2 w-full sm:col-span-6 md:col-span-3"
              id="from"
              value={from}
              label="From"
              type="datetime-local"
              onChange={e => setDate('from', e.target.value)}
            />
            <FieldInput
              className="col-span-12 row-span-2 w-full sm:col-span-6 md:col-span-3"
              id="to"
              value={to}
              label="To"
              type="datetime-local"
              onChange={e => setDate('to', e.target.value)}
            />
            <FieldCheckbox
              className="col-span-12 max-md:order-1 sm:col-span-6 md:col-span-3"
              id="apply"
              label="Date for Filter"
              checked={apply}
              onChange={e => setValue('apply', e.target.checked)}
            />
            <Button
              className="order-2 col-span-12 sm:col-span-6 md:col-span-3"
              variant="destructive"
              onClick={() => {
                resetValues()
                resetDates()
              }}
            >
              Clear
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default SearchForm
