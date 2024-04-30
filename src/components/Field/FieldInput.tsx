import { getDateTimeInputValue } from '@/utils/getDateTimeInputValue'
import { memo } from 'react'
import { FieldInputProps } from './interfaces'
import { cn } from '@/lib/utils'

const FieldInput = ({
  label,
  name,
  id,
  className,
  type,
  placeholder,
  pattern,
  autoComplete,
  required,
  disabled,
  value,
  error,
  onBlur,
  onChange,
}: FieldInputProps) => {
  return (
    <div className={`grid-cols-[auto auto] grid w-full gap-2 ${className}`}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <span
        className={cn(
          'text-red break-words',
          label ? 'justify-self-end text-right' : 'order-1 col-span-2 text-center',
          error ? 'block' : 'hidden',
        )}
      >
        {error}
      </span>
      <input
        className={cn(
          'col-span-2 h-[2.125rem] w-full rounded-2xl border bg-white px-3 py-1 placeholder:text-violet-400',
          error ? 'border-red text-red-600 placeholder:text-red-400' : 'border-current',
        )}
        value={type === 'datetime-local' ? getDateTimeInputValue(value) : value}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default memo(FieldInput)
