'use client'

import { useDeleteCallMe, useUpdateCallMe } from '@/api/queries/CallMe/mutations'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ICallMe } from 'adealer-types'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  call: ICallMe
}

export const CallActionCell = ({ call }: Props) => {
  const router = useRouter()

  const { mutate: updateCall, isPending: isUpdating } = useUpdateCallMe(call.id.toString())
  const { mutate: deleteCall, isPending: isDeleting } = useDeleteCallMe(call.id.toString())

  const [openDelete, setOpenDelete] = useState(false)
  const [openCheck, setOpenCheck] = useState(false)

  const handleCheck = () => {
    updateCall(
      {
        checked: true,
      },
      {
        onSuccess: () => {
          setOpenCheck(false)
        },
      },
    )
  }

  const handleDelete = () => {
    deleteCall(undefined, {
      onSuccess: () => {
        setOpenDelete(false)
      },
    })
  }

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => router.push(`/calls/${call.id}`)}>Edit</DropdownMenuItem>
          {!call.checked && <DropdownMenuItem onSelect={() => setOpenCheck(true)}>Mark as checked</DropdownMenuItem>}
          <DropdownMenuItem onSelect={() => setOpenDelete(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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

      <Dialog open={openCheck} onOpenChange={setOpenCheck}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Call?</DialogTitle>
            <DialogDescription>Have you processed this call?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCheck(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleCheck}>
              Mark as checked
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
