import { FieldCheckboxProps } from './interfaces'
import { memo } from 'react'
import { cn } from '@/lib/utils'

const FieldCheckbox = ({ label, name, id, className, checked, error, onChange, onBlur }: FieldCheckboxProps) => {
  return (
    <div className={cn('grid grid-cols-[auto_auto] items-center gap-1', className)}>
      <input id={id} type="checkbox" name={name} checked={checked} onChange={onChange} onBlur={onBlur} />
      <label htmlFor={id}>{label}</label>
      <span className={cn('text-red col-span-2', error ? 'block' : 'hidden')}>{error}</span>
    </div>
  )
}

export default memo(FieldCheckbox)
