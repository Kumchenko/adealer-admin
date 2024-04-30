import { memo } from 'react'
import { FieldRadioProps } from './interfaces'
import { cn } from '@/lib/utils'

const FieldRadio = ({ label, name, id, className, value, fieldValue, onChange, onBlur }: FieldRadioProps) => {
  return (
    <>
      <input
        className="hidden"
        type="radio"
        name={name}
        checked={fieldValue === value}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id} className={cn(className, 'cursor-pointer', { ['font-bold']: fieldValue === value })}>
        {label}
      </label>
    </>
  )
}

export default memo(FieldRadio)
