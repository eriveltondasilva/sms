import type {
  CheckboxProps as FlowbiteCheckboxProps,
  FileInputProps as FlowbiteFileInputProps,
  RadioProps as FlowbiteRadioProps,
  SelectProps as FlowbiteSelectProps,
  TextInputProps as FlowbiteTextInputProps,
  TextareaProps as FlowbiteTextareaProps,
} from 'flowbite-react'

type InputBase = {
  error?: string
  label?: string
}

type InputValue = {
  id: string
  name: string
  label: string
}

type SelectInputValue = string | Omit<InputValue, 'label'>

export type CheckboxProps = {
  id: string
  label: string
} & FlowbiteCheckboxProps

export type TextProps = InputBase & FlowbiteTextInputProps

export type TextareaProps = InputBase & FlowbiteTextareaProps

export type SelectProps = InputBase & {
  values: SelectInputValue[]
} & FlowbiteSelectProps

export type RadioProps = InputBase & {
  initialCheckedValue?: string
  values: InputValue[]
} & FlowbiteRadioProps

export type FileProps = {
  id: string
  label: string
} & FlowbiteFileInputProps
