import { FormikContextType } from 'formik'
import {
    ChangeEventHandler,
    FocusEventHandler,
    HTMLInputTypeAttribute,
} from 'react'

export type IForm = React.PropsWithChildren<{
    className?: string
    formik: FormikContextType<any>
}>

export type IFormInput = {
    label: string
    name: string
    id: string
    className?: string
    type?: HTMLInputTypeAttribute
    placeholder?: string
    pattern?: string
    autoComplete?: string
    required?: boolean
    disabled?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
}
