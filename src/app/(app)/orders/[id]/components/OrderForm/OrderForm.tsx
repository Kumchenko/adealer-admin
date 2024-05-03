import { useComponents } from '@/api/queries/Component/queries'
import { useModels } from '@/api/queries/Model/queries'
import { useDeleteOrder, useUpdateOrder } from '@/api/queries/Order/mutations'
import { useServices } from '@/api/queries/Service/queries'
import Card from '@/components/Card/Card'
import FieldInput from '@/components/Field/FieldInput'
import FieldSelect from '@/components/Field/FieldSelect'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OrderStatusOptions } from '@/constants'
import { modelIdConverter } from '@/utils/stringConverter'
import { useOptions } from '@/utils/useOptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { EStatus, IOrderRead } from 'adealer-types'
import { useRouter } from 'next/navigation'
import { memo, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3).max(32),
  surname: z.string().min(3).max(32),
  tel: z.string().regex(/^[+]{1}38[0]{1}[0-9]{9}$/, 'Incorrect format'),
  email: z.string().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Incorrect format'),
  modelId: z.string(),
  componentId: z.string(),
  qualityId: z.string(),
  cost: z.number().min(0, "Can't be less 0"),
  operation: z.nativeEnum(EStatus).nullable(),
})

type Values = z.infer<typeof schema>

const OrderForm = ({ order: orderObj }: { order: IOrderRead }) => {
  const {
    service: { modelId, componentId, qualityId },
    serviceId,
    created,
    ...order
  } = orderObj

  const router = useRouter()

  const [openDelete, setOpenDelete] = useState(false)

  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder(order.id.toString())
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder(order.id.toString())

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isDirty, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: order.name,
      surname: order.surname,
      tel: order.tel,
      email: order.email,
      modelId: modelId ?? '',
      componentId: componentId ?? '',
      qualityId: qualityId ?? '',
      cost: order.cost,
    },
  })

  const chosenModelId = watch('modelId')
  const chosenComponentId = watch('componentId')

  // Retrieving needed data
  const { data: models } = useModels()
  const { data: components } = useComponents({ modelId: chosenModelId })
  const { data: services } = useServices({
    modelId: chosenModelId,
    componentId: chosenComponentId,
  })

  // Preparing arrays of objects for select options
  const modelOptions = useOptions(models, modelIdConverter)
  const componentOptions = useOptions(components)
  const qualities = useMemo(() => services?.map(service => service.qualityId), [services])
  const qualityOptions = useOptions(qualities)

  const currentOperations = order.operations?.map(op => op.status)

  const handleClose = () => router.push('/orders')

  const handleUpdate = (values: Values) => {
    const { name, surname, tel, email, cost, modelId, componentId, qualityId, operation } = values
    updateOrder(
      {
        name,
        surname,
        tel,
        email,
        cost: cost.toString(),
        modelId,
        componentId,
        qualityId,
        status: operation ?? undefined,
      },
      { onSuccess: data => reset(data) },
    )
  }

  const handleDelete = () => {
    deleteOrder(undefined, { onSuccess: handleClose })
  }

  const handleUpdatePrice = (qualityId: string) => {
    setValue('cost', services?.find(service => service.qualityId === qualityId)?.cost || 0)
  }

  return (
    <>
      <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit(handleUpdate)}>
        <Card className="flex flex-col items-start gap-3">
          <h5 className="text-h5 font-semibold">Base info</h5>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <FieldInput placeholder="John" id="name" label="Name" type="text" error={error?.message} {...props} />
            )}
          />
          <Controller
            name="surname"
            control={control}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <FieldInput
                placeholder="Doe"
                id="surname"
                label="Surname"
                type="text"
                error={error?.message}
                {...props}
              />
            )}
          />
          <Controller
            name="tel"
            control={control}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <FieldInput
                placeholder="+38"
                id="tel"
                label="Phone number"
                type="text"
                error={error?.message}
                {...props}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { ref, ...props }, fieldState: { error } }) => (
              <FieldInput
                placeholder="example@example.com"
                id="email"
                label="Email"
                type="email"
                error={error?.message}
                {...props}
              />
            )}
          />
        </Card>

        <Card className="flex flex-col items-start gap-3">
          <h5 className="text-h5 font-semibold">Service info</h5>
          <Controller
            name="modelId"
            control={control}
            render={({ field: { ref, onChange, ...props }, fieldState: { error } }) => (
              <FieldSelect
                id="model"
                label="Model"
                placeholder="Choose model"
                options={modelOptions}
                onChange={e => {
                  onChange(e)
                  setValue('componentId', '')
                  setValue('qualityId', '')
                }}
                error={error?.message}
                {...props}
              />
            )}
          />
          <Controller
            name="componentId"
            control={control}
            render={({ field: { ref, onChange, ...props }, fieldState: { error } }) => (
              <FieldSelect
                id="component"
                label="Component"
                placeholder="Choose component"
                options={componentOptions}
                onChange={e => {
                  onChange(e)
                  setValue('qualityId', '')
                }}
                error={error?.message}
                {...props}
              />
            )}
          />
          <Controller
            name="qualityId"
            control={control}
            render={({ field: { ref, onChange, ...props }, fieldState: { error } }) => (
              <FieldSelect
                id="quality"
                label="Quality"
                placeholder="Choose quality"
                options={qualityOptions}
                onChange={e => {
                  onChange(e)
                  handleUpdatePrice(e.target.value)
                }}
                error={error?.message}
                {...props}
              />
            )}
          />
          <Controller
            name="cost"
            control={control}
            render={({ field: { ref, value, ...props }, fieldState: { error } }) => (
              <FieldInput
                id="cost"
                label="Cost"
                placeholder="Cost (UAH)"
                type="text"
                value={value.toString()}
                error={error?.message}
                {...props}
              />
            )}
          />
        </Card>

        <Card className="flex flex-col gap-3 overflow-y-auto">
          <h5 className="text-h5 font-semibold">Status</h5>
          {!!order.operations.length ? (
            order.operations.map(op => (
              <div key={op.id}>
                <p>
                  {op.status} by {op.employee.login}
                </p>
                <p>{new Date(op.dateTime).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <span>No operations – Just created</span>
          )}
        </Card>

        <Card className="flex flex-col gap-3">
          <div>
            <h5 className="mb-2 text-h5 font-semibold">Add new status</h5>
            <Controller
              name="operation"
              control={control}
              render={({ field: { ref, value, ...props }, fieldState: { error } }) => (
                <FieldSelect
                  id="status"
                  label="New status"
                  value={(value as string) ?? ''}
                  placeholder="Don't add status"
                  placeholderDisabled={false}
                  options={OrderStatusOptions.filter(option => !currentOperations.includes(option.value))}
                  error={error?.message}
                  {...props}
                />
              )}
            />
          </div>
          <div className="mb-0 mt-auto">
            <h5 className="mb-2 text-h5 font-semibold">Actions</h5>
            <div className="mb-0 grid grid-cols-3 items-start gap-2">
              <Button variant="outline" type="button" onClick={handleClose}>
                Close
              </Button>
              <Button variant="destructive" type="button" onClick={() => setOpenDelete(true)} isLoading={isDeleting}>
                Delete
              </Button>
              <Button variant="success" type="submit" disabled={!isDirty || isSubmitting} isLoading={isUpdating}>
                Save
              </Button>
            </div>
          </div>
        </Card>
      </form>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order?</DialogTitle>
            <DialogDescription>
              Are you sure that you want to delete this Order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default memo(OrderForm)
