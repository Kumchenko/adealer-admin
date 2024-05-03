import { useDeleteCallMe, useUpdateCallMe } from '@/api/queries/CallMe/mutations'
import OldButton from '@/components/Button/Button'
import { DesignColor } from '@/constants'
import { ICallMe } from 'adealer-types'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FieldInput from '@/components/Field/FieldInput'
import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const schema = z.object({
  name: z.string().min(3).max(32),
  tel: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[+]{1}38[0]{1}[0-9]{9}$/, 'Incorrect format'),
  created: z.string().refine(arg => new Date(arg) <= new Date(), 'Future date'),
  checked: z
    .string()
    .refine(arg => new Date(arg) <= new Date(), 'Future date')
    .nullable(),
})

type Values = z.infer<typeof schema>

const CallForm = ({ call }: { call: ICallMe }) => {
  const router = useRouter()

  const [openDelete, setOpenDelete] = useState(false)

  const { mutate: updateCall, isPending: isUpdating } = useUpdateCallMe(call.id.toString())
  const { mutate: deleteCall, isPending: isDeleting } = useDeleteCallMe(call.id.toString())

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: call.name,
      tel: call.tel,
      created: call.created,
      checked: call.checked ?? null,
    },
  })

  const handleClose = () => router.back()

  const handleUpdate = ({ name, tel, checked }: Values) => {
    updateCall(
      {
        name,
        tel,
        checked: checked || null,
      },
      {
        onSuccess: newCall => {
          toast('Call has been updated')
          reset(newCall)
        },
      },
    )
  }

  const handleDelete = () => {
    deleteCall(undefined, {
      onSuccess: () => {
        toast('Call has been deleted')
        handleClose()
      },
    })
  }

  return (
    <>
      <form className="grid grid-cols-3 gap-3" onSubmit={handleSubmit(handleUpdate)}>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...props } }) => (
            <FieldInput className="col-span-3" id="name" label="Name" type="text" {...props} />
          )}
        />
        <Controller
          name="tel"
          control={control}
          render={({ field: { ref, ...props } }) => (
            <FieldInput className="col-span-3" id="tel" label="Phone number" type="text" {...props} />
          )}
        />
        <Controller
          name="created"
          control={control}
          render={({ field: { ref, ...props } }) => (
            <FieldInput className="col-span-3" id="created" label="Created" type="datetime-local" {...props} disabled />
          )}
        />
        <Controller
          name="checked"
          control={control}
          render={({ field: { ref, value, ...props } }) => (
            <FieldInput
              className="col-span-3 mb-2"
              id="checked"
              label="Checked"
              type="datetime-local"
              value={value ?? ''}
              {...props}
            />
          )}
        />
        <OldButton type="button" onClick={handleClose} color={DesignColor.Violet}>
          Close
        </OldButton>
        <OldButton type="button" onClick={() => setOpenDelete(true)} color={DesignColor.Red} isLoading={isDeleting}>
          Delete
        </OldButton>
        <OldButton type="submit" disabled={!isDirty || isSubmitting} color={DesignColor.Green} isLoading={isUpdating}>
          Save
        </OldButton>
      </form>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Call?</DialogTitle>
            <DialogDescription>
              Are you sure that you want to delete this Call? This action cannot be undone.
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

export default CallForm
