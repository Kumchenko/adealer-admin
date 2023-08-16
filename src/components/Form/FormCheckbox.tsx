import { useFormikContext } from 'formik'
import { FormCheckboxProps } from './interfaces'
import { memo } from 'react'

const FormCheckbox = ({ label, name, id, className }: FormCheckboxProps) => {
    const { handleBlur, handleChange, getFieldProps, getFieldMeta } = useFormikContext()
    const { value } = getFieldProps(name)
    const { error, touched } = getFieldMeta(name)

    return (
        <div className={`grid grid-cols-[auto_auto] items-center gap-1 ${className}`}>
            <input id={id} type="checkbox" name={name} checked={value} onChange={handleChange} onBlur={handleBlur} />
            <label htmlFor={id}>{label}</label>
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

export default memo(FormCheckbox)
