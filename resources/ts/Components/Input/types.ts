import type {
  RadioProps,
  SelectProps,
  TextInputProps,
  TextareaProps,
} from 'flowbite-react'

type InputBaseProps = {
  error?: string
  label?: string
}

type InputValue = {
  id: string
  name: string
  label: string
}

type SelectInputValue = string | Omit<InputValue, 'label'>

export type InputTextProps = InputBaseProps & TextInputProps

export type InputTextareaProps = InputBaseProps & TextareaProps

export type InputSelectProps = InputBaseProps & {
  values: SelectInputValue[]
} & SelectProps

export type InputRadioProps = InputBaseProps & {
  initialCheckedValue?: string
  values: InputValue[]
} & RadioProps
