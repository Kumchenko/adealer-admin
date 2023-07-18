'use client'
import { useFormikContext } from 'formik'
import { IFormInput } from './interfaces'

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
    onChange,
    onBlur,
}: IFormInput) => {
    const { handleBlur, handleChange, getFieldProps, getFieldMeta } =
        useFormikContext()

    const { value } = getFieldProps(name)
    const { error, touched } = getFieldMeta(name)

    return (
        <div className={className}>
            <div className="flex justify-between">
                <label className="shrink-0" htmlFor={id}>
                    {label}
                </label>
                <span
                    className={`text-center text-red ${
                        error && touched ? 'block' : 'hidden'
                    }`}
                >
                    {error}
                </span>
            </div>
            <input
                className={`
                    mt-1 w-full rounded-2xl border bg-transparent  px-3 py-1
                    placeholder:text-violet-light
                    ${error && touched ? 'border-red' : 'border-current'}
                `}
                value={value}
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                pattern={pattern}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                onChange={e => {
                    handleChange(e)
                    onChange ? onChange(e) : null
                }}
                onBlur={e => {
                    handleBlur(e)
                    onBlur ? onBlur(e) : null
                }}
            />
        </div>
    )
}

export { FormInput }
