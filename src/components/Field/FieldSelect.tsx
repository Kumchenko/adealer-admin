import { cn } from '@/lib/utils'
import { FieldSelectProps } from './interfaces'
import { memo } from 'react'

const FieldSelect = ({
  id,
  value,
  error,
  className,
  disabled,
  label,
  required,
  options,
  placeholder,
  placeholderDisabled = true,
  onBlur,
  onChange,
}: FieldSelectProps) => {
  return (
    <div className={`grid-cols-[auto auto] grid w-full gap-2 ${className}`}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <span
        className={cn(
          'text-red break-words',
          error ? 'block' : 'hidden',
          label ? 'justify-self-end text-right' : 'order-1 col-span-2 text-center',
        )}
      >
        {error}
      </span>
      <select
        className={
          'col-span-2 h-[34px] appearance-none rounded-2xl border bg-white bg-polygon bg-select bg-no-repeat py-1 pl-3 pr-6 ' +
          (error ? 'border-red-600 text-red-600 placeholder:text-red-400' : 'border-current')
        }
        id={id}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      >
        {placeholder ? (
          <option key="placeholder" value="" disabled={placeholderDisabled}>
            {placeholder}
          </option>
        ) : null}
        {options?.map(option => {
          if (typeof option === 'object') {
            return (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            )
          }
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default memo(FieldSelect)
