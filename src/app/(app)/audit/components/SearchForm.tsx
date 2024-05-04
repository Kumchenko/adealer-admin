import Card from '@/components/Card/Card'
import FieldInput from '@/components/Field/FieldInput'
import FieldSelect from '@/components/Field/FieldSelect'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { AuditMethodOptions } from '@/constants/audit'
import { useActionFiltersStore } from '@/stores/ActionFiltersStore'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { memo } from 'react'

const SearchForm = () => {
  const { from, to, resetValues: resetDates, setValue: setDate } = useDateFiltersStore()
  const { opened, login, method, resetValues, setValue } = useActionFiltersStore()
  return (
    <Card className="px-4 py-1 shadow-md">
      <Accordion
        defaultValue={opened ? 'item-1' : undefined}
        type="single"
        collapsible
        onValueChange={value => setValue('opened', !!value)}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl">Filters</AccordionTrigger>
          <AccordionContent className="grid grid-cols-12 items-center justify-items-center gap-x-4 gap-y-2">
            <FieldInput
              className="col-span-12 w-full sm:col-span-5"
              type="text"
              value={login}
              id="login"
              placeholder="Login"
              onChange={e => setValue('login', e.target.value)}
            />
            <FieldSelect
              className="col-span-12 w-full sm:col-span-5"
              value={method}
              options={AuditMethodOptions}
              id="method"
              placeholder="All"
              placeholderDisabled={false}
              onChange={e => setValue('method', e.target.value)}
            />
            <FieldInput
              className="col-span-12 row-span-2 w-full sm:col-span-5"
              id="from"
              value={from}
              label="From"
              type="datetime-local"
              onChange={e => setDate('from', e.target.value)}
            />
            <FieldInput
              className="col-span-12 row-span-2 w-full sm:col-span-5"
              id="to"
              value={to}
              label="To"
              type="datetime-local"
              onChange={e => setDate('to', e.target.value)}
            />
            <Button
              className="order-2 col-span-12 sm:col-span-2"
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
