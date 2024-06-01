import Card from '@/components/Card/Card'
import FieldCheckbox from '@/components/Field/FieldCheckbox'
import FieldInput from '@/components/Field/FieldInput'
import FieldRadio from '@/components/Field/FieldRadio'
import FieldSelect from '@/components/Field/FieldSelect'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CallFilters } from '@/constants'
import { useCallFiltersStore } from '@/stores/CallFilltersStore'
import { useDashboardFiltersStore } from '@/stores/DashboardFiltersStore'
import { useDateFiltersStore } from '@/stores/DateFiltersStore'
import { ETimeframe } from 'adealer-types'
import { memo } from 'react'

const timeframeOptions = Object.values(ETimeframe)

const SearchForm = () => {
  const { to, resetValues: resetDates, setValue: setDate } = useDateFiltersStore()
  const { opened, timeframe, resetValues, setValue } = useDashboardFiltersStore()
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
          <AccordionContent className="grid grid-cols-12 items-center justify-items-center gap-x-4 gap-y-4">
            <FieldSelect
              className="col-span-12 w-full sm:col-span-4"
              id="timeframe"
              label="Timeframe"
              value={timeframe}
              options={timeframeOptions}
              placeholder="Choose timeframe"
              placeholderDisabled={false}
              onChange={e => setValue('timeframe', e.target.value as ETimeframe)}
            />
            <FieldInput
              className="col-span-12 w-full sm:col-span-4"
              id="to"
              value={to}
              label="To"
              type="datetime-local"
              onChange={e => setDate('to', e.target.value)}
            />
            <Button
              className="col-span-12 sm:col-span-4"
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
