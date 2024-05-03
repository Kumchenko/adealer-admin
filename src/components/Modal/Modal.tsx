'use client'
import { closeModal } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/stores'
import { ExclamationCircleIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import Card from '../Card/Card'
import { ModalType } from '@/constants'
import { HTMLAttributes, useEffect } from 'react'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { cn } from '@/lib/utils'

const Modal = () => {
  const dispatch = useAppDispatch()
  const { show, modals } = useAppSelector(state => state.modal)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [show])

  return (
    <div
      onClick={e => dispatch(closeModal())}
      className={cn(
        'absolute left-0 top-0 z-50 flex h-[100vh] w-[100vw] max-w-full flex-col items-center justify-center gap-4 p-8 backdrop-blur-sm backdrop-brightness-90 transition-opacity md:items-end md:justify-end',
        show ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
      )}
    >
      {modals.map(({ title, description, type, key }) => (
        <Card onClick={e => e.stopPropagation()} className={cn('min-w-[140px] md:max-w-md', getStyle(type))} key={key}>
          <button onClick={e => dispatch(closeModal(key))} className="absolute right-0 top-0 z-10 p-2">
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-1">
            {getIcon(type)}
            <h5 className="text-h5 font-semibold">{title || capitalizeFirstLetter(type)}</h5>
          </div>
          <p className="whitespace-break-spaces">{description}</p>
        </Card>
      ))}
    </div>
  )
}

const getIcon = (type: ModalType) => {
  switch (type) {
    case ModalType.Info: {
      return <InformationCircleIcon className="h-6 w-6" />
    }
    case ModalType.Error: {
      return <ExclamationCircleIcon className="h-6 w-6" />
    }
    default: {
      const _exhaustiveCheck: never = type
      return null
    }
  }
}

const getStyle = (type: ModalType): HTMLAttributes<HTMLDivElement>['className'] => {
  switch (type) {
    case ModalType.Info: {
      return 'text-indigo-600'
    }
    case ModalType.Error: {
      return 'text-red-600 border-red-600'
    }
    default: {
      const _exhaustiveCheck: never = type
      return ''
    }
  }
}

export default Modal
