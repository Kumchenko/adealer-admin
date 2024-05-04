'use client'

import { useBlockEmployee } from '@/api/queries/Employee/mutations'
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
import { IEmployeeRead } from 'adealer-types'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  employee: IEmployeeRead
  hide?: boolean
}

export const EmployeeActionCell = ({ employee, hide }: Props) => {
  const router = useRouter()

  const { mutate: blockEmployee, isPending: isBlocking } = useBlockEmployee()

  const [openBlock, setOpenBlock] = useState(false)

  const isBlocked = employee.attempts === 0

  const handleBlock = () => {
    if (hide) return

    blockEmployee(
      {
        login: employee.login,
        block: !isBlocked,
      },
      {
        onSuccess: () => {
          setOpenBlock(false)
        },
      },
    )
  }

  if (hide) return null

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setOpenBlock(true)}>{isBlocked ? 'Unblock' : 'Block'}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openBlock} onOpenChange={setOpenBlock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${isBlocked ? 'Unblock' : 'Block'} block`}</DialogTitle>
            <DialogDescription>
              {`Are you sure that you want to ${isBlocked ? 'unblock' : 'block'} this ${employee.login}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenBlock(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBlock}>
              {isBlocked ? 'Unblock' : 'Block'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
