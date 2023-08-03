import { FormFieldProps } from './interfaces'
import { useId } from 'react'
import { getDateTimeInputValue } from '@/utils'
import { useFormikContext } from 'formik'

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

    const elementId = id ? id : useId()

    return (
        <div className={`grid grid-cols-2 gap-1 ${className}`}>
            {label ? <label htmlFor={elementId}>{label}</label> : null}
            <span
                className={`
                 text-red 
                ${label ? 'justify-self-end' : 'order-1 col-span-2 text-center'}
                ${error && touched ? 'block' : 'hidden'}
            `}
            >
                {error}
            </span>
            <input
                className={`
                    col-span-2
                    rounded-2xl border bg-white px-3 py-1 placeholder:text-violet-light
                    ${error && touched ? 'border-red' : 'border-current'}
                `}
                value={type === 'datetime-local' ? getDateTimeInputValue(value) : value}
                name={name}
                id={elementId}
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

export { FormInput }
