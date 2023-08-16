import { FormFieldProps } from './interfaces'
import { getDateTimeInputValue } from '@/utils'
import { useFormikContext } from 'formik'
import { memo } from 'react'

const FormInput = ({
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
}: FormFieldProps) => {
    const { handleBlur, handleChange, getFieldProps, getFieldMeta } = useFormikContext()
    const { value } = getFieldProps(name)
    const { error, touched } = getFieldMeta(name)

    return (
        <div className={`grid-cols-[auto auto] grid w-full gap-2 ${className}`}>
            {label ? <label htmlFor={id}>{label}</label> : null}
            <span
                className={`
                 break-words text-red
                ${label ? 'justify-self-end text-right' : 'order-1 col-span-2 text-center'}
                ${error && touched ? 'block' : 'hidden'}
            `}
            >
                {error}
            </span>
            <input
                className={`
                    col-span-2
                    h-[2.125rem] w-full
                    rounded-2xl border bg-white px-3 py-1 placeholder:text-violet-light
                    ${error && touched ? 'border-red text-red placeholder:text-red-light' : 'border-current'}
                    ${type === 'datetime-local' ? 'bg-calendar bg-select bg-no-repeat pr-8' : null}
                `}
                value={type === 'datetime-local' ? getDateTimeInputValue(value) : value}
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                pattern={pattern}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    )
}

export default memo(FormInput)
