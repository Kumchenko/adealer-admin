import { useId } from 'react'
import { FormRadioProps } from './interfaces'
import { useFormikContext } from 'formik'

const FormRadio = ({ label, name, id, className, value }: FormRadioProps) => {
    const { handleBlur, handleChange, getFieldProps, getFieldMeta } = useFormikContext()
    const { value: fieldValue } = getFieldProps(name)

    const elementId = id ? id : useId()
    return (
        <>
            <input
                className="hidden"
                type="radio"
                value={value}
                name={name}
                checked={fieldValue === value}
                id={elementId}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <label htmlFor={elementId} className={`${fieldValue === value && 'font-bold'} ${className} cursor-pointer`}>
                {label}
            </label>
        </>
    )
}

export { FormRadio }
