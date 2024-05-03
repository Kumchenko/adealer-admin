import Card from '@/components/Card/Card'
import FieldCheckbox from '@/components/Field/FieldCheckbox'
import FieldInput from '@/components/Field/FieldInput'
import FieldRadio from '@/components/Field/FieldRadio'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CallFilters } from '@/constants'
import { useCallFiltersStore } from '@/stores/CallFilltersStore'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { memo } from 'react'

const SearchForm = () => {
  const { from, to, resetValues: resetDates, setValue: setDate } = useDateFiltersStore()
  const { apply, id, name, tel, filter, resetValues, setValue } = useCallFiltersStore()
  return (
    <Card className="px-4 py-1 shadow-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Filters</AccordionTrigger>
          <AccordionContent className="grid grid-cols-12 items-center justify-items-center gap-x-4 gap-y-2">
            <FieldInput
              className="col-span-12 w-full sm:col-span-4"
              type="text"
              value={id}
              id="id"
              placeholder="ID"
              onChange={e => setValue('id', e.target.value)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-4"
              type="text"
              value={name}
              id="name"
              placeholder="Name"
              onChange={e => setValue('name', e.target.value)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-4"
              type="text"
              value={tel}
              id="tel"
              placeholder="Tel"
              onChange={e => setValue('tel', e.target.value)}
            />
            <div className="col-span-12 row-span-2 flex gap-x-2 max-md:order-1 sm:col-span-6 md:col-span-3 md:flex-col">
              {CallFilters.map(({ title, value }) => (
                <FieldRadio
                  name="filter"
                  key={value}
                  id={value}
                  label={title}
                  fieldValue={value}
                  value={filter}
                  onChange={() => setValue('filter', value)}
                />
              ))}
            </div>
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
              className="order-2 col-span-12 sm:col-span-6 md:col-span-3"
              id="apply"
              checked={apply}
              onChange={e => setValue('apply', e.target.checked)}
              label="Date for Filter"
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

export default memo(SearchForm)
