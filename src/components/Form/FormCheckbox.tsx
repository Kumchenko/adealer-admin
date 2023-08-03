import { useFormikContext } from 'formik'
import { useId } from 'react'
import { FormCheckboxProps } from './interfaces'

const FormCheckbox = ({ label, name, id, className }: FormCheckboxProps) => {
    const { handleBlur, handleChange, getFieldProps, getFieldMeta } = useFormikContext()
    const { value } = getFieldProps(name)
    const { error, touched } = getFieldMeta(name)

    const elementId = id ? id : useId()
    return (
        <div className={`grid grid-cols-[auto_auto] gap-1 ${className}`}>
            <input
                id={elementId}
                type="checkbox"
                name={name}
                checked={value}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <label htmlFor={elementId}>{label}</label>
            <span
                className={`
                 col-span-2 text-red
                ${error && touched ? 'block' : 'hidden'}
            `}
            >
                {error}
            </span>
        </div>
    )
}

export { FormCheckbox }
