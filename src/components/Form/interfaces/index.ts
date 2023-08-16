import { FormikContextType } from 'formik'
import { HTMLInputTypeAttribute } from 'react'

export type FormProps = React.PropsWithChildren<{
    className?: string
    formik: FormikContextType<any>
}>

export type FormFieldProps = {
    label?: string
    name: string
    id: string
    className?: string
    type: HTMLInputTypeAttribute
    placeholder?: string
    pattern?: string
    autoComplete?: string
    required?: boolean
    disabled?: boolean
}

export type Option = {
    title: string
    value: string | number
}

export type FormSelectProps = {
    label?: string
    name: string
    id: string
    className?: string
    required?: boolean
    disabled?: boolean
    placeholder?: string
    placeholderDisabled?: boolean
    options?: Option[]
}

export type FormRadioProps = {
    label: string
    name: string
    id: string
    className?: string
    value: string
}

export type FormCheckboxProps = {
    label: string
    name: string
    id: string
    className?: string
}

export type FormSelectorProps = {
    label: string
    name: string
    id: string
    options: Option[] | number[] | string[]
}
