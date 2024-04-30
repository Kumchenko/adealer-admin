import { FormikContextType } from 'formik'
import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute } from 'react'

export type FieldInputProps = {
  label?: string
  name?: string
  id: string

  className?: string
  type: HTMLInputTypeAttribute

  placeholder?: string
  pattern?: string
  autoComplete?: string

  required?: boolean
  disabled?: boolean

  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>

  error?: string
}

export type FieldRadioProps = {
  label: string
  name: string
  id: string

  className?: string

  value: string
  fieldValue: string

  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

export type FieldCheckboxProps = {
  label: string
  name?: string
  id: string

  className?: string

  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>

  error?: string
}

export type Option = {
  title: string
  value: string | number
}

export type FieldSelectorProps = {
  label: string
  id: string

  value?: string | number
  options?: readonly Option[] | readonly number[] | readonly string[]

  onChange?: ChangeEventHandler<HTMLSelectElement>
  onBlur?: FocusEventHandler<HTMLSelectElement>
}
