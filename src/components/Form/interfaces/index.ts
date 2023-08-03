import { FormikContextType } from 'formik'
import { HTMLInputTypeAttribute } from 'react'

export type FormProps = React.PropsWithChildren<{
    className?: string
    formik: FormikContextType<any>
}>

export type FormFieldProps = {
    label?: string
    name: string
    id?: string
    className?: string
    type: HTMLInputTypeAttribute
    placeholder?: string
    pattern?: string
    autoComplete?: string
    required?: boolean
    disabled?: boolean
}

export type FormRadioProps = {
    label: string
    name: string
    id?: string
    className?: string
    value: string
}

export type FormCheckboxProps = {
    label: string
    name: string
    id?: string
    className?: string
}
