import { useFormikContext } from 'formik'
import { FormSelectProps } from './interfaces'
import { memo } from 'react'

const FormSelect = ({
    id,
    name,
    className,
    disabled,
    label,
    required,
    options,
    placeholder,
    placeholderDisabled = true,
}: FormSelectProps) => {
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
            <select
                className={`
                    col-span-2 h-[34px] appearance-none
                    rounded-2xl border
                    bg-white bg-polygon bg-select bg-no-repeat 
                    py-1 pl-3 pr-6
                    ${error && touched ? 'border-red text-red placeholder:text-red-light' : 'border-current'}
                `}
                placeholder="Model"
                name={name}
                id={id}
                value={value}
                required={required}
                disabled={disabled}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                {placeholder ? (
                    <option key="placeholder" value="" disabled={placeholderDisabled}>
                        {placeholder}
                    </option>
                ) : null}
                {options?.map(({ value, title }) => (
                    <option key={value} value={value}>
                        {title}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default memo(FormSelect)
