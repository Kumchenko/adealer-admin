import { memo } from 'react'
import { FormRadioProps } from './interfaces'
import { useFormikContext } from 'formik'

const FormRadio = ({ label, name, id, className, value }: FormRadioProps) => {
    const { handleBlur, handleChange, getFieldProps } = useFormikContext()
    const { value: fieldValue } = getFieldProps(name)
    return (
        <>
            <input
                className="hidden"
                type="radio"
                value={value}
                name={name}
                checked={fieldValue === value}
                id={id}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <label htmlFor={id} className={`${fieldValue === value && 'font-bold'} ${className} cursor-pointer`}>
                {label}
            </label>
        </>
    )
}

export default memo(FormRadio)
