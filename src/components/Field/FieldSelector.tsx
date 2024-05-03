import { memo } from 'react'
import { FieldSelectorProps } from './interfaces'

const FieldSelector = ({ id, label, value, onBlur, onChange, options }: FieldSelectorProps) => {
  return (
    <div className="flex items-baseline rounded-3xl border border-violet-400 bg-violet-50 py-1 pl-3 pr-1">
      <label htmlFor={id} className="mr-2 text-lg">
        {label}:
      </label>
      <select
        id={id}
        className="appearance-none bg-transparent bg-polygon bg-select bg-no-repeat pl-3 pr-6 outline-none"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
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

export default memo(FieldSelector)
